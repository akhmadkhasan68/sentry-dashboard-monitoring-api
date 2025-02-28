import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    app: {
        port: process.env.APP_PORT || 3000,
        env: process.env.APP_ENV || 'development',
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    sentry: {
        api: {
            authToken: process.env.SENTRY_API_AUTH_TOKEN || '',
            baseUrl: process.env.SENTRY_API_BASE_URL || ''
        }
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || '',
        type: process.env.DB_TYPE || 'mysql'
    },
    scheduler: {
        sentryOrganizationUserSyncEnabling: process.env.SCHEDULER_SENTRY_ORGANIZATION_USER_SYNC_ENABLING || 'true',
        sentryOrganizationUserSyncCron: process.env.SCHEDULER_SENTRY_ORGANIZATION_USER_SYNC_CRON || '0 0 * * *',

        sentryProjectSyncEnabling: process.env.SCHEDULER_SENTRY_PROJECT_SYNC_ENABLING || 'true',
        sentryProjectSyncCron: process.env.SCHEDULER_SENTRY_PROJECT_SYNC_CRON || '0 0 * * *',
        
        sentryTeamSyncEnabling: process.env.SCHEDULER_SENTRY_TEAM_SYNC_ENABLING || 'true',
        sentryTeamSyncCron: process.env.SCHEDULER_SENTRY_TEAM_SYNC_CRON || '0 0 * * *',

        projectSentrySummaryReportEnabling: process.env.SCHEDULER_PROJECT_SENTRY_SUMMARY_REPORT_ENABLING || 'true',
        projectSentrySummaryReportCron: process.env.SCHEDULER_PROJECT_SENTRY_SUMMARY_REPORT_CRON || '0 0 * * *',
    }
};
