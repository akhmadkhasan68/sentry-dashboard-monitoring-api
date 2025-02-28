import { CronJob } from "cron";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { SentryTeamService } from "../services/sentry/sentry-team.service";
import { IScheduler } from "./scheduler.interface";
import { config } from "@config/config";

export class SentryTeamSyncScheduler implements IScheduler {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryTeamService: SentryTeamService,
    ) {
        this.logger = new LoggerHelper(SentryTeamSyncScheduler.name);
    }

    public async initScheduler(): Promise<void> {
        const isEnabling = config.scheduler.sentryTeamSyncEnabling === 'true';
        if (!isEnabling) {
            this.logger.setLogger.info('sentry team sync scheduler is disabled... 🚀');
            return;
        }

        const cronExpression = config.scheduler.sentryTeamSyncCron;

        this.logger.setLogger.info('init sentry team sync scheduler... 🚀');
        try {
            return new CronJob(cronExpression, async () => {
                this.logger.setLogger.info('run sync sentry team... 🚀');

                await this.sentryTeamService.syncSentryTeamToInternalDatabase();

                this.logger.setLogger.info('sync sentry team successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
