import express from 'express';
import { config } from './config/config';
import configureRouter from './routes/index.routes';
import configureDI from './app.module';
import bodyParser from 'body-parser';
import connection from './database/config';
import { SentryProjectSyncScheduler } from './scheduler/sentry-project-sync.scheduler';
import { loggingMiddleware } from './infrastructure/middlewares/logging.middleware';
import { LoggerHelper } from './infrastructure/logger/logger';
import { SentryTeamSyncScheduler } from './scheduler/sentry-team-sync.scheduler';
import { SchedulerService } from './scheduler.service';

//init Express APP
const port = config.app.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add logging middleware
app.use(loggingMiddleware);

const logger = new LoggerHelper('App');

//init database
connection.sync({ alter: true })
.then(() => {
  logger.setLogger.info('Database connected successfully... 🚀');
})
.catch((err) => {
  logger.setLogger.error(`Error when connect to database: ${err.message}`);

  process.exit(1);
});

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer);

//init scheduler
new SchedulerService(diContainer).start();

app.listen(port, () => logger.setLogger.info(`Server is running on port ${port}... 🚀`));
