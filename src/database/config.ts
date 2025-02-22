import { config } from "../config/config";
import { DataSource } from "typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { SentryProjectEntity } from "./entities/sentry/sentry-project.entity";
import { SentryTeamEntity } from "./entities/sentry/sentry-team.entity";
import { SentryOrganizationUserEntity } from "./entities/sentry/sentry-organization-user.entity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  logging: false,
  entities: [
    ProjectEntity,
    SentryProjectEntity,
    SentryTeamEntity,
    SentryOrganizationUserEntity,
  ],
  synchronize: false,
});
