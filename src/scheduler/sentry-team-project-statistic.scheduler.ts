import { CronJob } from "cron";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { IScheduler } from "./scheduler.interface";
import { CronExpressionConstant } from "../utils/constants/cron-expression.constant";
import { SentryTeamProjectStatisticService } from "@services/sentry/sentry-team-project-statistic.service";

export class SentryTeamProjectStatisticScheduler implements IScheduler {
    private readonly logger: LoggerHelper;
    
    constructor(
        private readonly sentryTeamProjectStatisticService: SentryTeamProjectStatisticService,
    ) {
        this.logger = new LoggerHelper(SentryTeamProjectStatisticScheduler.name);
    }

    public async initScheduler(): Promise<void> {
        this.logger.setLogger.info('init sentry team & project statistic sync scheduler... 🚀');
        try {
            return new CronJob(CronExpressionConstant.EVERY_1_MINUTE, async () => {
                this.logger.setLogger.info('run sync sentry team & project statistic... 🚀');

                // await this.sentryTeamProjectStatisticService.syncSentryTeamToInternalDatabase();

                this.logger.setLogger.info('sync sentry team & project statistic successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
