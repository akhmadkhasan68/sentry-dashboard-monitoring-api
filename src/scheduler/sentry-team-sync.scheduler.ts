import { CronJob } from "cron";
import { CronExpressionConstant } from "../utils/constants/cron-expression.constant";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { SentryTeamService } from "../services/sentry/sentry-team.service";
import { IScheduler } from "./scheduler.interface";

export class SentryTeamSyncScheduler implements IScheduler {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryTeamService: SentryTeamService,
    ) {
        this.logger = new LoggerHelper(SentryTeamSyncScheduler.name);
    }

    public initScheduler(): void {
        this.logger.setLogger.info('init sentry team sync scheduler... 🚀');
        try {
            return new CronJob(CronExpressionConstant.EVERY_1_MINUTE, async () => {
                this.logger.setLogger.info('run sync sentry team... 🚀');

                await this.sentryTeamService.syncSentryTeamToInternalDatabase();

                this.logger.setLogger.info('sync sentry team successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
