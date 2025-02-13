import express from 'express';
import { config } from './config/config';
import configureRouter from './routes/index.routes';
import configureDI from './app.module';
import bodyParser from 'body-parser';
import connection from './database/config';
import { SentryProjectSyncScheduler } from './scheduler/sentry-project-sync.scheduler';

//init Express APP
const port = config.app.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init database
connection.sync({ alter: true })
.then(() => {
  console.log("Database successfully connected... 🚀");
})
.catch((err) => {
  console.log("Error", err);
});

//init twitter client API
// const twitterClientAuthService = new TwitterClientAuthService();
// const twitterClient: TwitterApi = twitterClientAuthService.initClient();

//init modules & routes
const diContainer = configureDI();
configureRouter(app, diContainer);

//init scheduler
diContainer.get<SentryProjectSyncScheduler>(SentryProjectSyncScheduler.name).initScheduler();

app.listen(port, () => console.log(`Application running on port ${port}... 🚀`));
