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
}
