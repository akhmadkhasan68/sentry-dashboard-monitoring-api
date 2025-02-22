import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { Dialect } from "sequelize";
import { ProjectModel } from "./models/project.model";
import { SentryProjectModel } from "./models/sentry/sentry-project.model";
import { SentryTeamModel } from "./models/sentry/sentry-team.model";
import { SentryOrganizationUserModel } from "./models/sentry/sentry-organization-user.model";

const connection = new Sequelize({
  dialect: config.database.dialect as Dialect,
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  logging: false,
  models: [
    ProjectModel,
    SentryProjectModel,
    SentryTeamModel,
    SentryTeamModel,
    SentryOrganizationUserModel,
  ],
});

export default connection;
