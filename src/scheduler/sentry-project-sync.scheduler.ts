import { CronJob } from "cron";
import { SentryProjectService } from "../services/sentry/sentry-project.service";
import { CronExpressionConstant } from "../utils/constants/cron-expression.constant";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { IScheduler } from "./scheduler.interface";

export class SentryProjectSyncScheduler implements IScheduler {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {
        this.logger = new LoggerHelper(SentryProjectSyncScheduler.name);
    }

    public initScheduler(): void {
        this.logger.setLogger.info('init sentry project sync scheduler... 🚀');
        try {
            return new CronJob(CronExpressionConstant.EVERY_1_MINUTE, async () => {
                this.logger.setLogger.info('run sync sentry project... 🚀');

                await this.sentryProjectService.syncSentryProjectToInternalDatabase();

                this.logger.setLogger.info('sync sentry project successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
