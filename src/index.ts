import 'module-alias/register';
import express from 'express';
import { config } from '@config/config';
import configureRouter from '@routes/index.routes';
import configureDI from './app.module';
import bodyParser from 'body-parser';
import { loggingMiddleware } from '@infrastructure/middlewares/logging.middleware';
import { LoggerHelper } from '@infrastructure/logger/logger';
import { SchedulerService } from './scheduler.service';
import AppDataSource from "@database/datasource.config";
import { errorHandlerMiddleware } from '@infrastructure/middlewares/error-handler.middleware';

//init Express APP
const port = config.app.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add logging middleware
app.use(loggingMiddleware);

const logger = new LoggerHelper('App');

//init database
AppDataSource.initialize().then(() => {
  logger.setLogger.info('Database connection established... 🎉');
}).catch((error) => {
  logger.setLogger.error(`Database connection failed: ${error}... 😢`)
});

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer);

//init scheduler
new SchedulerService(diContainer).start();

// Add Exception Handler Middleware
app.use(errorHandlerMiddleware);

app.listen(port, () => logger.setLogger.info(`Server is running on port ${port}... 🚀`));
