import express from 'express';
import DIContainer, { IDIContainer } from "rsdi";
import * as core from 'express-serve-static-core';
import { SentryProjectController } from '@controllers/sentry/sentry-project.controller';
import { SentryStatisticController } from '@controllers/sentry/sentry-statistic.controller';

export default function configureRouter(app: core.Express, diContainer: DIContainer<{[key: string]: any;}>) {
    /** Health Check Endpoint */
    app.get('/health-check', (_, res) => {
        res.json();
    });

    /** Init Router */
    const router = express.Router();

    /** Sentry Project Routes */
    const sentryProjectRouter = express.Router();
    const sentryProjectController = diContainer.get<SentryProjectController>(SentryProjectController.name);
    sentryProjectRouter.get('/', sentryProjectController.index.bind(sentryProjectController));
    router.use('/sentry-projects', sentryProjectRouter);

    /** Sentry Statictic Routes*/
    const sentryStatisticRouter = express.Router();
    const sentryStatisticController = diContainer.get<SentryStatisticController>(SentryStatisticController.name);
    sentryStatisticRouter.get('/project-unresolved-issues', sentryStatisticController.getProjectUnresolvedIssues.bind(sentryStatisticController));
    router.use('/sentry-statistic', sentryStatisticRouter);

    app.use('/api', router);
}
