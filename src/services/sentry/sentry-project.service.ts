import { SentryApiProjectRepository } from "../../repositories/integrations/sentry-api/sentry-api-project.repository";
import { LoggerHelper } from "../../infrastructure/logger/logger";
import { SentryProjectRepository } from "../../repositories/sentry/sentry-project.repository";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";
import { IPaginationResponse } from "../../utils/interfaces/response/response.interface";
import { Request } from "express";
import { IPaginationRequest } from "../../utils/interfaces/request/pagination-request.interface";
import { PaginateOrderEnum } from "../../utils/enums/paginate-order.enum";

export class SentryProjectService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryProjectRepository: SentryProjectRepository,
        private readonly sentryApiProjectRepository: SentryApiProjectRepository,
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
            // Fetch data from Sentry API
            const sentryProjects = await this.sentryApiProjectRepository.fetchProjects();

            // Map data to internal database
            const mappedSentryProjects = sentryProjects.map((project): ISentryProject => {
                return {
                    sentryProjectName: project.name,
                    sentryProjectId: project.id,
                    sentryProjectSlug: project.slug,
                };
            });

            // Get Existing Sentry Projects from internal database
            const existingSentryProjects = await this.sentryProjectRepository.findAll();
            
            // create object new data
            const newData = mappedSentryProjects.filter((project) => {
                return !existingSentryProjects.some((existingProject) => existingProject.sentryProjectId === project.sentryProjectId);
            });

            // create object updated data
            const updatedData = mappedSentryProjects.filter((project) => {
                return existingSentryProjects.some((existingProject) => existingProject.sentryProjectId === project.sentryProjectId);
            }).map((project) : ISentryProject => {
                return {
                    id: existingSentryProjects.find((existingProject) => existingProject.sentryProjectId === project.sentryProjectId).id,
                    sentryProjectId: project.sentryProjectId,
                    sentryProjectName: project.sentryProjectName,
                    sentryProjectSlug: project.sentryProjectSlug,
                };
            });

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
