import { config } from "../config/config";
import { DataSource } from "typeorm";
import { ProjectEntity } from "./entities/project/project.entity";
import { SentryTeamEntity } from "./entities/sentry/sentry-team.entity";
import { SentryProjectEntity } from "./entities/sentry/sentry-project.entity";
import { SentryOrganizationUserEntity } from "./entities/sentry/sentry-organization-user.entity";
import { Init1740246833021 } from "./migrations/1740246833021-init";
import { AlterSentryTeamTable1740249799526 } from "./migrations/1740249799526-alter-sentry-team-table";

export default new DataSource({
  type: 'mysql',
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  logging: false,
  entities: [
    ProjectEntity,
    SentryTeamEntity,
    SentryProjectEntity,
    SentryOrganizationUserEntity,
  ],
  migrations: [
    Init1740246833021,
    AlterSentryTeamTable1740249799526,
  ],
  synchronize: false,
});
