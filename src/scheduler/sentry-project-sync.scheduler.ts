import { CronJob } from "cron";
import { SentryProjectService } from "../services/sentry/sentry-project.service";
import { CronExpressionConstant } from "../utils/constants/cron-expression.constant";

export class SentryProjectSyncScheduler {
    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {}

    public initScheduler(): void {
        try {
            return new CronJob(CronExpressionConstant.EVERY_1_MINUTE, async () => {
                // console.log('run sync direct message to db... 🚀');
                // await this.schedulerService.syncDirectMessageToDatabase();

                // console.log('run post tweet confirmed... 🚀');
                // await this.schedulerService.postTweetConfirmedDirectMessage();
            }).start();
        } catch (error) {
            console.log(error);
        }
    }
}
