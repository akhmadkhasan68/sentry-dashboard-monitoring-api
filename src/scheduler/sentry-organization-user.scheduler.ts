import { CronJob } from "cron";
import { CronExpressionConstant } from "../utils/constants/cron-expression.constant";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { SentryOrganizationUserService } from "../services/sentry/sentry-organization-user.service";
import { IScheduler } from "./scheduler.interface";

export class SentryOrganizationUserScheduler implements IScheduler {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly sentryOrganizationUserService: SentryOrganizationUserService,
    ) {
        this.logger = new LoggerHelper(SentryOrganizationUserScheduler.name);
    }

    public initScheduler(): void {
        this.logger.setLogger.info('init sentry organization user sync scheduler... 🚀');
        try {
            return new CronJob(CronExpressionConstant.EVERY_1_MINUTE, async () => {
                this.logger.setLogger.info('run sync sentry organization user... 🚀');

                await this.sentryOrganizationUserService.syncSentryProjectToInternalDatabase();

                this.logger.setLogger.info('sync sentry organization user successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
