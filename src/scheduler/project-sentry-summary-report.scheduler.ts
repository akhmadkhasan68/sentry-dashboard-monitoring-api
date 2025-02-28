import { CronJob } from "cron";
import { LoggerHelper } from "../infrastructure/logger/logger";
import { IScheduler } from "./scheduler.interface";
import { config } from "@config/config";
import { ProjectSentrySummaryReportService } from "@services/project/project-sentry-summary-report.service";

export class ProjectSentrySummaryReportScheduler implements IScheduler {
    private readonly logger: LoggerHelper;

    constructor(
        private readonly projectSentrySummaryReportService: ProjectSentrySummaryReportService,
    ) {
        this.logger = new LoggerHelper(ProjectSentrySummaryReportScheduler.name);
    }

    public initScheduler(): void {
        const isEnabling = config.scheduler.projectSentrySummaryReportEnabling === 'true';
        if (!isEnabling) {
            this.logger.setLogger.info('project sentry summary report scheduler is disabled... 🚀');
            return;
        }
        const cronExpression = config.scheduler.projectSentrySummaryReportCron;
        this.logger.setLogger.info('init project sentry summary report scheduler... 🚀');

        try {
            return new CronJob(cronExpression, async () => {
                this.logger.setLogger.info('run project sentry summary report... 🚀');

                await this.projectSentrySummaryReportService.generateProjectSentrySummaryReport();

                this.logger.setLogger.info('project sentry summary report successfully... 🚀');
            }).start();
        } catch (error) {
            this.logger.setLogger.error(`Error when run scheduler: ${error.message}`);
        }
    }
}
