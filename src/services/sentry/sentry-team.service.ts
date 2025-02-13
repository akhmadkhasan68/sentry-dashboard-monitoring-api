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
            const newData = mappedSentryTeam.filter((team) => {
                return !existingSentryTeams.some((existingTeam) => existingTeam.sentryTeamId === team.sentryTeamId);
            });

            // Save data to internal database
            await this.sentryTeamRepository.bulkCreate(newData);
        } catch (error) {
            this.logger.setLogger.error(`Error when sync sentry team to internal database: ${error.message}`);

            throw error;
        }
    }
}
