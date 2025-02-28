import express from 'express';
import DIContainer, { IDIContainer } from "rsdi";
import * as core from 'express-serve-static-core';
import { SentryProjectController } from '@controllers/sentry/sentry-project.controller';
import { ProjectController } from '@controllers/project/project.controller';
import { ProjectSentrySummaryReportController } from '@controllers/project/project-sentry-summary-report.controller';

export default function configureRouter(app: core.Express, diContainer: DIContainer<{[key: string]: any;}>) {
    /** Health Check Endpoint */
    app.get('/health-check', (_, res) => {
        res.json();
    });

    /** Init Router */
    const router = express.Router();

    /** Project Routes */
    const projectRouter = express.Router();
    const projectController = diContainer.get<ProjectController>(ProjectController.name);
    projectRouter.get('/', projectController.findAll.bind(projectController));
    router.use('/projects', projectRouter);

    /** Project Sentry Summary Reposrt Routes */
    const projectSentrySummaryReportRouter = express.Router();
    const projectSentrySummaryReportController = diContainer.get<ProjectSentrySummaryReportController>(ProjectSentrySummaryReportController.name);
    projectSentrySummaryReportRouter.get('/', projectSentrySummaryReportController.findAll.bind(projectSentrySummaryReportController));
    projectSentrySummaryReportRouter.get('/:projectId', projectSentrySummaryReportController.findByProjectId.bind(projectSentrySummaryReportController));
    projectSentrySummaryReportRouter.get('/generate-project-sentry-issue-unresolved-report/:projectId', projectSentrySummaryReportController.generateProjectSentryIssueUnresolvedReport.bind(projectSentrySummaryReportController));
    router.use('/project-sentry-summary-reports', projectSentrySummaryReportRouter);

    /** Sentry Project Routes */
    const sentryProjectRouter = express.Router();
    const sentryProjectController = diContainer.get<SentryProjectController>(SentryProjectController.name);
    sentryProjectRouter.get('/', sentryProjectController.index.bind(sentryProjectController));
    router.use('/sentry-projects', sentryProjectRouter);

    app.use('/api', router);
}
