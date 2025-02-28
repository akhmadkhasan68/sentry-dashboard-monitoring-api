import { IProjectSentrySummaryReport } from "@database/interfaces/project/project-sentry-summary-report.interface";
import { BusinessErrorException } from "@infrastructure/exceptions/business-error.exception";
import { LoggerHelper } from "@infrastructure/logger/logger";
import { SentryApiOrganizationProjectRepository } from "@repositories/integrations/sentry-api/sentry-api-organization-project.repository";
import { ProjectSentrySummaryReportRepository } from "@repositories/project/project-sentry-summary-report.repository";
import { ProjectRepository } from "@repositories/project/project.repository";
import { SentryProjectTypeEnum } from "@utils/enums/sentry-project-type.enum";

export class ProjectSentrySummaryReportService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly projectSentrySummaryReportRepository: ProjectSentrySummaryReportRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly sentryApiOrganizationProjectRepository: SentryApiOrganizationProjectRepository,
    ) {
        this.logger = new LoggerHelper(ProjectSentrySummaryReportService.name);
    }

    public async findAllWithRelations(): Promise<IProjectSentrySummaryReport[]> {
        try {
            return await this.projectSentrySummaryReportRepository.findAllWithRelations();
        } catch (error) {
            this.logger.setLogger.error(`Error when get project sentry summary report with relations: ${error.message}`);

            throw error;
        }
    }

    public async findByProjectId(projectId: string): Promise<IProjectSentrySummaryReport[]> {
        try {
            return await this.projectSentrySummaryReportRepository.findByConditionsWithRelations({
                projectId,
            });
        } catch (error) {
            this.logger.setLogger.error(`Error when get project sentry summary report by project id: ${error.message}`);

            throw error;
        }
    }

    public async findByIdWithRelations(id: string): Promise<IProjectSentrySummaryReport> {
        try {
            return await this.projectSentrySummaryReportRepository.findByIdWithRelations(id);
        } catch (error) {
            this.logger.setLogger.error(`Error when get project sentry summary report with relations: ${error.message}`);

            throw error;
        }
    }
    
    public async generateProjectSentryIssueUnresolvedReport(projectId: string, isThrowable = true): Promise<IProjectSentrySummaryReport[]> {
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
            // const projectSentryIssueUnresolvedStatistic: {
            //     projectName: string;
            //     sentryProjectName: string;
            //     sentryProjectSlug: string;
            //     serviceName: string | null;
            //     type: string;
            //     totalIssueUnresolved: number;
            // }[] = [];

            const mappingProjectSentryIssueUnresolvedStatistics: {
                projectId: string;
                projectName: string;
                sentryProjectId: string;
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
                                mappingProjectSentryIssueUnresolvedStatistics.push({
                                    projectId: project.id as string,
                                    projectName: project.name,
                                    sentryProjectId: microserviceProject.id as string,
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
                            mappingProjectSentryIssueUnresolvedStatistics.push({
                                projectId: project.id as string,
                                projectName: project.name,
                                sentryProjectId: otherElseMicroserviceProject.id as string,
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
                        mappingProjectSentryIssueUnresolvedStatistics.push({
                            projectId: project.id as string,
                            projectName: project.name,
                            sentryProjectId: sentryProject.id as string,
                            sentryProjectName: sentryProject.sentryProjectName,
                            sentryProjectSlug: sentryProject.sentryProjectSlug,
                            serviceName: null,
                            type: sentryProject.type,
                            totalIssueUnresolved: 0,
                        });
                    }
                }
            }

            if (!mappingProjectSentryIssueUnresolvedStatistics.length) {
                throw new BusinessErrorException("Project has no sentry project");
            }

            const projectSentryIssueUnresolvedStatistic: IProjectSentrySummaryReport[] = [];

            for (const mapping of mappingProjectSentryIssueUnresolvedStatistics) {
                const issues = await this.sentryApiOrganizationProjectRepository.fetchOrganizationProjectUnresolvedIssues(mapping.sentryProjectSlug, mapping.serviceName);

                mapping.totalIssueUnresolved = issues.length;

                projectSentryIssueUnresolvedStatistic.push({
                    projectId: mapping.projectId,
                    sentryProjectId: mapping.sentryProjectId,
                    serviceName: mapping.serviceName,
                    totalIssueUnresolved: mapping.totalIssueUnresolved,
                });
            }

            if (!projectSentryIssueUnresolvedStatistic.length) {
                throw new BusinessErrorException("Project has no sentry issue unresolved statistic");
            }

            const existingProjectSentryIssueUnresolvedStatistic = await this.projectSentrySummaryReportRepository.findAll();
            
            const createdProjectSentryIssueUnresolvedStatistic = projectSentryIssueUnresolvedStatistic.filter((projectSentryIssueUnresolved) => {
                return !existingProjectSentryIssueUnresolvedStatistic.some((existingProjectSentryIssueUnresolved) => {
                    return projectSentryIssueUnresolved.projectId === existingProjectSentryIssueUnresolved.projectId && 
                    projectSentryIssueUnresolved.sentryProjectId === existingProjectSentryIssueUnresolved.sentryProjectId &&
                    projectSentryIssueUnresolved.serviceName === existingProjectSentryIssueUnresolved.serviceName;
                });
            });

            const updatedProjectSentryIssueUnresolvedStatistic = projectSentryIssueUnresolvedStatistic.filter((projectSentryIssueUnresolved) => {
                return existingProjectSentryIssueUnresolvedStatistic.some((existingProjectSentryIssueUnresolved) => {
                    return projectSentryIssueUnresolved.projectId === existingProjectSentryIssueUnresolved.projectId && 
                    projectSentryIssueUnresolved.sentryProjectId === existingProjectSentryIssueUnresolved.sentryProjectId &&
                    projectSentryIssueUnresolved.serviceName === existingProjectSentryIssueUnresolved.serviceName;
                });
            }).map((projectSentryIssueUnresolved): IProjectSentrySummaryReport => {
                return {
                    id: existingProjectSentryIssueUnresolvedStatistic.find((existingProjectSentryIssueUnresolved) => {
                        return projectSentryIssueUnresolved.projectId === existingProjectSentryIssueUnresolved.projectId && 
                        projectSentryIssueUnresolved.sentryProjectId === existingProjectSentryIssueUnresolved.sentryProjectId &&
                        projectSentryIssueUnresolved.serviceName === existingProjectSentryIssueUnresolved.serviceName;
                    })?.id as string,
                    ...projectSentryIssueUnresolved,
                }
            });

            if (createdProjectSentryIssueUnresolvedStatistic.length) {
                await this.projectSentrySummaryReportRepository.bulkCreate(createdProjectSentryIssueUnresolvedStatistic);
            }

            if (updatedProjectSentryIssueUnresolvedStatistic.length) {
                await this.projectSentrySummaryReportRepository.bulkUpdate(updatedProjectSentryIssueUnresolvedStatistic);
            }

            return [
                ...createdProjectSentryIssueUnresolvedStatistic,
                ...updatedProjectSentryIssueUnresolvedStatistic,
            ];
        } catch (error) {
            this.logger.setLogger.error(`Error when generate project sentry issue unresolved statistic: ${error.message}`);
            if (isThrowable) {
                throw error;
            }

            return [];
        }
    }

    public async generateProjectSentrySummaryReport(): Promise<void> {
        try {
            const projects = await this.projectRepository.findAllWithRelations();

            for (const project of projects) {
                await this.generateProjectSentryIssueUnresolvedReport(project.id as string, false);
            }
        } catch (error) {
            this.logger.setLogger.error(`Error when generate project sentry summary report: ${error.message}`);

            throw error;
        }
    }
}
