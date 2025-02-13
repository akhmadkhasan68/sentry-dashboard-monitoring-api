import { SentryApiProjectRepository } from "../../repositories/integrations/sentry-api/sentry-api-project.repository";
import { LoggerHelper } from "../../infrastructure/logger/logger";
import { SentryProjectRepository } from "../../repositories/sentry/sentry-project.repository";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";

export class SentryProjectService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryProjectRepository: SentryProjectRepository,
        private readonly sentryApiProjectRepository: SentryApiProjectRepository,
    ) {
        this.logger = new LoggerHelper(SentryProjectService.name);
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
            const newData = mappedSentryProjects.filter((project) => {
                return !existingSentryProjects.some((existingProject) => existingProject.sentryProjectId === project.sentryProjectId);
            });

            // Save data to internal database
            await this.sentryProjectRepository.bulkCreate(newData);
        } catch (error) {
            this.logger.setLogger.error(`Error when sync sentry project to internal database: ${error.message}`);

            throw error;
        }
    }
}
