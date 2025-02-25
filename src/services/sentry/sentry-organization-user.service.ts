import { LoggerHelper } from "../../infrastructure/logger/logger";
import { SentryOrganizationUserRepository } from "@repositories/sentry/sentry-organization-user.repository";
import { SentryApiOrganizationUserRepository } from "@repositories/integrations/sentry-api/sentry-api-organization-user.repository";
import { ISentryOrganizationUser } from "../../database/interfaces/sentry/sentry-organization-user.interface";

export class SentryOrganizationUserService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryOrganizationUserRepository: SentryOrganizationUserRepository,
        private readonly sentryApiOrganizationUserRepository: SentryApiOrganizationUserRepository,
    ) {
        this.logger = new LoggerHelper(SentryOrganizationUserService.name);
    }

    public async syncSentryProjectToInternalDatabase(): Promise<void> {
        try {
            // Fetch data from Sentry API
            const sentryOrganizationUsers = await this.sentryApiOrganizationUserRepository.fetchOrganizationUsers();

            // Map data to internal database
            const mappedSentryOrganizationUsers = sentryOrganizationUsers.map((organizationUser): ISentryOrganizationUser => {
                return {
                    sentryUserId: organizationUser.id,
                    sentryUserEmail: organizationUser.email,
                    sentryUserName: organizationUser.name,
                };
            });

            // Get Existing Sentry Projects from internal database
            const existingSentryOrganizationUsers = await this.sentryOrganizationUserRepository.findAll();

            // Create object new data
            const newData = mappedSentryOrganizationUsers.filter((organizationUser) => {
                return !existingSentryOrganizationUsers.some((existingOrganizationUser) => existingOrganizationUser.sentryUserId === organizationUser.sentryUserId);
            });

            // Create object updated data
            const updatedData = mappedSentryOrganizationUsers.filter((organizationUser) => {
                return existingSentryOrganizationUsers.some((existingOrganizationUser) => existingOrganizationUser.sentryUserId === organizationUser.sentryUserId);
            }).map((organizationUser): ISentryOrganizationUser => {
                return {
                    id: existingSentryOrganizationUsers.find((existingOrganizationUser) => existingOrganizationUser.sentryUserId === organizationUser.sentryUserId)?.id,
                    sentryUserId: organizationUser.sentryUserId,
                    sentryUserEmail: organizationUser.sentryUserEmail,
                    sentryUserName: organizationUser.sentryUserName,
                };
            });

            // Save data to internal database
            await Promise.all([
                this.sentryOrganizationUserRepository.bulkCreate(newData),
                this.sentryOrganizationUserRepository.bulkUpdate(updatedData),
            ]);
        } catch (error) {
            this.logger.setLogger.error(`Error when sync sentry organization user to internal database: ${error.message}`);

            throw error;
        }
    }
}
