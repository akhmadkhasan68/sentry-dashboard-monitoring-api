import express from 'express';
import DIContainer, { IDIContainer } from "rsdi";
import * as core from 'express-serve-static-core';
import { SentryProjectController } from '../controllers/sentry/sentry-project.controller';

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

    

    app.use('/api', router);
}
