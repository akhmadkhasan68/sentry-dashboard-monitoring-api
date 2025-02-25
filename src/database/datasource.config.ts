import { config } from "../config/config";
import { DataSource } from "typeorm";
import { ProjectEntity } from "./entities/project/project.entity";
import { SentryTeamEntity } from "./entities/sentry/sentry-team.entity";
import { SentryProjectEntity } from "./entities/sentry/sentry-project.entity";
import { SentryOrganizationUserEntity } from "./entities/sentry/sentry-organization-user.entity";
import { Init1740246833021 } from "./migrations/1740246833021-init";
import { AlterSentryTeamTable1740249799526 } from "./migrations/1740249799526-alter-sentry-team-table";
import { AlterTableSentryProjectAddColumn1740455447705 } from "./migrations/1740455447705-AlterTableSentryProjectAddColumn";
import { SentryTeamProjectStatisticEntity } from "./entities/sentry/sentry-team-project-statistic.entity";
import { CreateSentryTeamProjectStatisticTable1740472971372 } from "./migrations/1740472971372-CreateSentryTeamProjectStatisticTable";
import { AlterSentryTeamProjectStatisticTable1740473098448 } from "./migrations/1740473098448-AlterSentryTeamProjectStatisticTable";
import { AlterSentryTeamProjectStatisticTable1740474669573 } from "./migrations/1740474669573-AlterSentryTeamProjectStatisticTable";

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
    SentryTeamProjectStatisticEntity,
  ],
  migrations: [
    Init1740246833021,
    AlterSentryTeamTable1740249799526,
    AlterTableSentryProjectAddColumn1740455447705,
    CreateSentryTeamProjectStatisticTable1740472971372,
    AlterSentryTeamProjectStatisticTable1740473098448,
    AlterSentryTeamProjectStatisticTable1740474669573
  ],
  synchronize: false,
});
