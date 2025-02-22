import { SentryApiProjectRepository } from "../../repositories/integrations/sentry-api/sentry-api-project.repository";
import { LoggerHelper } from "../../infrastructure/logger/logger";
import { SentryProjectRepository } from "../../repositories/sentry/sentry-project.repository";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";
import { IPaginationResponse } from "../../utils/interfaces/response/response.interface";
import { Request } from "express";
import { IPaginationRequest } from "../../utils/interfaces/request/pagination-request.interface";
import { PaginateOrderEnum } from "../../utils/enums/paginate-order.enum";
import { SentryApiTeamRepository } from "../../repositories/integrations/sentry-api/sentry-api-team.repository";
import { SentryTeamRepository } from "../../repositories/sentry/sentry-team.repository";
import { SentryApiOrganizationProjectRepository } from "../../repositories/integrations/sentry-api/sentry-api-organization-project.repository";

export class SentryProjectService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryProjectRepository: SentryProjectRepository,
        private readonly sentryApiProjectRepository: SentryApiProjectRepository,
        private readonly sentryApiOrganizationProjectRepository: SentryApiOrganizationProjectRepository,
        private readonly sentryTeamRepository: SentryTeamRepository,
        private readonly sentryApiTeamRepository: SentryApiTeamRepository,
    ) {
        this.logger = new LoggerHelper(SentryProjectService.name);
    }

    public async index(req: Request): Promise<IPaginationResponse<ISentryProject>> {
        try {
            const request: IPaginationRequest<null> = {
                page: Number(req.query.page) || 1,
                perPage: Number(req.query.perPage) || 10,
                search: req.query.search as string,
                sort: req.query.sort as string || "createdAt",
                order: req.query.order as PaginateOrderEnum || PaginateOrderEnum.DESC,
                filters: null,
            }

            const sentryProjects = await this.sentryProjectRepository.paginate(request);

            return sentryProjects;
        } catch (error) {
            this.logger.setLogger.error(`Error when get sentry project: ${error.message}`);

            throw error;
        }
    }

    public async syncSentryProjectToInternalDatabase(): Promise<void> {
        try {
            // Fetch data from Sentry API & Database
            const [
                sentryApiProjects,
                sentryDbTeams,
            ] = await Promise.all([
                this.sentryApiOrganizationProjectRepository.fetchOrganizationProjects(),
                this.sentryTeamRepository.findAll(),
            ]);

            if (!sentryApiProjects.length || !sentryDbTeams.length) {
                return;
            }

            // Map data to internal database
            const mappedSentryProjects = sentryApiProjects.map((project): ISentryProject => {
                const sentryDbTeam = sentryDbTeams.find((team) => team.sentryTeamId === project.team.id);

                if (!sentryDbTeam) {
                    return null;
                }

                return {
                    sentryTeamId: sentryDbTeam.id,
                    sentryProjectName: project.name,
                    sentryProjectId: project.id,
                    sentryProjectSlug: project.slug,
                };
            }).filter((project) => project !== null);

            // Get Existing Sentry Projects from internal database
            const existingSentryProjects = await this.sentryProjectRepository.findAll();
            
            // create object new data
            const newData = mappedSentryProjects.filter((project) => {
                return !existingSentryProjects.some((existingProject) => existingProject.sentryProjectId === project.sentryProjectId);
            });

            // create object updated data
            const updatedData = sentryApiProjects.filter((project) => {
                return existingSentryProjects.some((existingProject) => existingProject.sentryProjectId === project.id);
            }).map((project) => {
                const sentryDbTeam = sentryDbTeams.find((team) => team.sentryTeamId === project.team.id);

                if (!sentryDbTeam) {
                    return null;
                }

                return {
                    id: existingSentryProjects.find((existingProject) => existingProject.sentryProjectId === project.id).id,
                    sentryTeamId: sentryDbTeam.id,
                    sentryProjectName: project.name,
                    sentryProjectId: project.id,
                    sentryProjectSlug: project.slug,
                };
            }).filter((project) => project !== null);

            // Save data to internal database
            await Promise.all([
                this.sentryProjectRepository.bulkCreate(newData),
                this.sentryProjectRepository.bulkUpdate(updatedData),
            ]);
        } catch (error) {
            this.logger.setLogger.error(`Error when sync sentry project to internal database: ${error.message}`);

            throw error;
        }
    }
}
