import { config } from "../config/config";
import { DataSource } from "typeorm";
import { ProjectEntity } from "./entities/project/project.entity";
import { SentryTeamEntity } from "./entities/sentry/sentry-team.entity";
import { SentryProjectEntity } from "./entities/sentry/sentry-project.entity";
import { SentryOrganizationUserEntity } from "./entities/sentry/sentry-organization-user.entity";
import { Init1740246833021 } from "./migrations/1740246833021-init";
import { AlterSentryTeamTable1740249799526 } from "./migrations/1740249799526-alter-sentry-team-table";
import { AlterTableSentryProjectAddColumn1740455447705 } from "./migrations/1740455447705-AlterTableSentryProjectAddColumn";
import { CreateSentryTeamProjectStatisticTable1740472971372 } from "./migrations/1740472971372-CreateSentryTeamProjectStatisticTable";
import { AlterSentryTeamProjectStatisticTable1740473098448 } from "./migrations/1740473098448-AlterSentryTeamProjectStatisticTable";
import { AlterSentryTeamProjectStatisticTable1740474669573 } from "./migrations/1740474669573-AlterSentryTeamProjectStatisticTable";
import { AlterSentryTeamProjectStatisticTable1740532945408 } from "./migrations/1740532945408-AlterSentryTeamProjectStatisticTable";
import { ProjectMicroserviceServiceEntity } from "./entities/project/project-microservice-service.entity";
import { CreateProjectMicroserviceServiceTable1740578930303 } from "./migrations/1740578930303-CreateProjectMicroserviceServiceTable";
import { ProjectSentryTeamEntity } from "./entities/project/project-sentry-team.entity";
import { CreateProjectSentryTeamTable1740584065217 } from "./migrations/1740584065217-CreateProjectSentryTeamTable";
import { AlterTableSentryProjectTable1740591774940 } from "./migrations/1740591774940-AlterTableSentryProjectTable";
import { ProjectSentrySummaryReportEntity } from "./entities/project/project-sentry-summary-report.entity";
import { CreateProjectSentrySummaryReportTable1740624646189 } from "./migrations/1740624646189-CreateProjectSentrySummaryReportTable";
import { DropSentryTeamProjectStatisticTable1740625383020 } from "./migrations/1740625383020-DropSentryTeamProjectStatisticTable";

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
    ProjectMicroserviceServiceEntity,
    ProjectSentryTeamEntity,
    ProjectSentrySummaryReportEntity,
  ],
  migrations: [
    Init1740246833021,
    AlterSentryTeamTable1740249799526,
    AlterTableSentryProjectAddColumn1740455447705,
    CreateSentryTeamProjectStatisticTable1740472971372,
    AlterSentryTeamProjectStatisticTable1740473098448,
    AlterSentryTeamProjectStatisticTable1740474669573,
    AlterSentryTeamProjectStatisticTable1740532945408,
    CreateProjectMicroserviceServiceTable1740578930303,
    CreateProjectSentryTeamTable1740584065217,
    AlterTableSentryProjectTable1740591774940,
    CreateProjectSentrySummaryReportTable1740624646189,
    DropSentryTeamProjectStatisticTable1740625383020,
  ],
  synchronize: false,
});
