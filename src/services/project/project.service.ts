import { IProject } from "@database/interfaces/project/project.interface";
import { BusinessErrorException } from "@infrastructure/exceptions/business-error.exception";
import { LoggerHelper } from "@infrastructure/logger/logger";
import { SentryApiOrganizationProjectRepository } from "@repositories/integrations/sentry-api/sentry-api-organization-project.repository";
import { ProjectRepository } from "@repositories/project/project.repository";
import { SentryProjectTypeEnum } from "@utils/enums/sentry-project-type.enum";

export class ProjectService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly sentryApiOrganizationProjectRepository: SentryApiOrganizationProjectRepository,
    ) {
        this.logger = new LoggerHelper(ProjectService.name);
    }

    public async findAllWithRelations(): Promise<IProject[]> {
        try {
            return await this.projectRepository.findAllWithRelations();
        } catch (error) {
            this.logger.setLogger.error(`Error when get projects with relations: ${error.message}`);

            throw error;
        }
    }

    public async generateProjectSentryIssueUnresolvedStatistic(projectId: string): Promise<any> {
        try {
            /**
             * [
             *  {
             *      projectName: "",
             *      sentryProjectName: "",
             *      sentryProjectSlug: "",
             *      serviceName: "",
             *      type: "",
             *      totalIssueUnresolved: 0,
             *  }
             * ]
             * 
             */
            const projectSentryIssueUnresolvedStatistic: {
                projectName: string;
                sentryProjectName: string;
                sentryProjectSlug: string;
                serviceName: string | null;
                type: string;
                totalIssueUnresolved: number;
            }[] = [];

            const project = await this.projectRepository.findByIdWithRelations(projectId);
            const projectSentryTeams = project.projectSentryTeams || [];

            if (!projectSentryTeams.length) {
                throw new BusinessErrorException("Project has no sentry team");
            }

            for (const projectSentryTeam of projectSentryTeams) {
                const sentryTeam = projectSentryTeam.sentryTeam;
                const sentryTeamProjects = sentryTeam?.sentryProjects || [];

                if (project.isMicroservices) {
                    const microserviceProjects = sentryTeamProjects.filter((microserviceService) => microserviceService.type === SentryProjectTypeEnum.MICROSERVICE);
                    const otherElseMicroserviceProjects = sentryTeamProjects.filter((microserviceService) => microserviceService.type !== SentryProjectTypeEnum.MICROSERVICE);

                    if (microserviceProjects.length) {
                        for (const microserviceProject of microserviceProjects) {
                            if (!project.projectMicroserviceServices?.length) {
                                throw new BusinessErrorException("Project has no microservice services");
                            }

                            for (const projectMicroserviceService of project.projectMicroserviceServices) {
                                projectSentryIssueUnresolvedStatistic.push({
                                    projectName: project.name,
                                    sentryProjectName: microserviceProject.sentryProjectName,
                                    sentryProjectSlug: microserviceProject.sentryProjectSlug,
                                    serviceName: projectMicroserviceService.name,
                                    type: microserviceProject.type,
                                    totalIssueUnresolved: 0,
                                });
                            }
                        }
                    }

                    if (otherElseMicroserviceProjects.length > 0) {
                        for (const otherElseMicroserviceProject of otherElseMicroserviceProjects) {
                            projectSentryIssueUnresolvedStatistic.push({
                                projectName: project.name,
                                sentryProjectName: otherElseMicroserviceProject.sentryProjectName,
                                sentryProjectSlug: otherElseMicroserviceProject.sentryProjectSlug,
                                serviceName: null,
                                type: otherElseMicroserviceProject.type,
                                totalIssueUnresolved: 0,
                            });
                        }
                    }
                } else {
                    for (const sentryProject of sentryTeamProjects) {
                        projectSentryIssueUnresolvedStatistic.push({
                            projectName: project.name,
                            sentryProjectName: sentryProject.sentryProjectName,
                            sentryProjectSlug: sentryProject.sentryProjectSlug,
                            serviceName: null,
                            type: sentryProject.type,
                            totalIssueUnresolved: 0,
                        });
                    }
                }
            }

            if (!projectSentryIssueUnresolvedStatistic.length) {
                throw new BusinessErrorException("Project has no sentry project");
            }

            for (const projectSentryIssueUnresolved of projectSentryIssueUnresolvedStatistic) {
                const issues = await this.sentryApiOrganizationProjectRepository.fetchOrganizationProjectUnresolvedIssues(projectSentryIssueUnresolved.sentryProjectSlug, projectSentryIssueUnresolved.serviceName);

                projectSentryIssueUnresolved.totalIssueUnresolved = issues.length;
            }

            return projectSentryIssueUnresolvedStatistic;
        } catch (error) {
            this.logger.setLogger.error(`Error when generate project sentry issue unresolved statistic: ${error.message}`);

            throw error;
        }
    }
}
