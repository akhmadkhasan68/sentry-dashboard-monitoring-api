import express from 'express';
import DIContainer, { IDIContainer } from "rsdi";
import * as core from 'express-serve-static-core';
import { SuccessResponse } from "../utils/response";
import { SentryProjectController } from '../controllers/sentry/sentry-project.controller';

export default function configureRouter(app: core.Express, diContainer: DIContainer<{[key: string]: any;}>) {
    const sentryProjectController = diContainer.get<SentryProjectController>(SentryProjectController.name);

    /** Health Check Endpoint */
    app.get('/health-check', (_, res) => {
        res.json(SuccessResponse.setSuccessRespose("OK", 200, []));
    });

    /** Init Router */
    const router = express.Router();
    router.get('/sentry-projects', sentryProjectController.index.bind(sentryProjectController));

    app.use('/api', router);
}
