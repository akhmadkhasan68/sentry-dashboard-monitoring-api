import { LoggerHelper } from "../../infrastructure/logger/logger";
import { ISentryTeam } from "../../database/interfaces/sentry/sentry-team.interface";
import { SentryApiTeamRepository } from "../../repositories/integrations/sentry-api/sentry-api-team.repository";
import { SentryTeamRepository } from "../../repositories/sentry/sentry-team.repository";

export class SentryTeamService {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryTeamRepository: SentryTeamRepository,
        private readonly sentryApiTeamRepository: SentryApiTeamRepository,
    ) {
        this.logger = new LoggerHelper(SentryTeamService.name);
    }

    public async syncSentryTeamToInternalDatabase(): Promise<void> {
        try {
            // Fetch data from Sentry API
            const sentryTeams = await this.sentryApiTeamRepository.fetchOrganizationTeams();

            // Map data to internal database
            const mappedSentryTeam = sentryTeams.map((team): ISentryTeam => {
                return {
                    sentryTeamName: team.name,
                    sentryTeamId: team.id,
                    sentryTeamSlug: team.slug,
                    sentryMemberCount: team.memberCount,
                };
            });

            // Get Existing Sentry Teams from internal database
            const existingSentryTeams = await this.sentryTeamRepository.findAll();

            // Create object new data
            const newData = mappedSentryTeam.filter((team) => {
                return !existingSentryTeams.some((existingTeam) => existingTeam.sentryTeamId === team.sentryTeamId);
            });

            // Create object updated data
            const updatedData = mappedSentryTeam.filter((team) => {
                return existingSentryTeams.some((existingTeam) => existingTeam.sentryTeamId === team.sentryTeamId);
            }).map((team): ISentryTeam => {
                return {
                    id: existingSentryTeams.find((existingTeam) => existingTeam.sentryTeamId === team.sentryTeamId).id,
                    sentryTeamId: team.sentryTeamId,
                    sentryTeamName: team.sentryTeamName,
                    sentryTeamSlug: team.sentryTeamSlug,
                    sentryMemberCount: team.sentryMemberCount,
                };
            });

            // Save data to internal database
            await Promise.all([
                this.sentryTeamRepository.bulkCreate(newData),
                this.sentryTeamRepository.bulkUpdate(updatedData),
            ]);
        } catch (error) {
            this.logger.setLogger.error(`Error when sync sentry team to internal database: ${error.message}`);

            throw error;
        }
    }
}
