import DIContainer, { object, use } from "rsdi";
import { SentryProjectService } from "./services/sentry/sentry-project.service";
import { SentryProjectRepository } from "./repositories/sentry/sentry-project.repository";
import { SentryTeamRepository } from "./repositories/sentry/sentry-team.repository";
import { ProjectRepository } from "./repositories/project.repository";
import { SentryTeamService } from "./services/sentry/sentry-team.service";
import { SentryProjectSyncScheduler } from "./scheduler/sentry-project-sync.scheduler";
import { SentryProjectController } from "./controllers/sentry/sentry-project.controller";
import { SentryApiProjectRepository } from "./repositories/integrations/sentry-api/sentry-api-project.repository";
import { SentryApiTeamRepository } from "./repositories/integrations/sentry-api/sentry-api-team.repository";
import { SentryTeamSyncScheduler } from "./scheduler/sentry-team-sync.scheduler";
import { SentryApiOrganizationUserRepository } from "./repositories/integrations/sentry-api/sentry-api-organization-user.repository";
import { SentryOrganizationUserRepository } from "./repositories/sentry/sentry-organization-user.repository";
import { SentryOrganizationUserScheduler } from "./scheduler/sentry-organization-user.scheduler";
import { SentryOrganizationUserService } from "./services/sentry/sentry-organization-user.service";
import { SentryApiOrganizationProjectRepository } from "./repositories/integrations/sentry-api/sentry-api-organization-project.repository";
import { ProjectEntity } from "./database/entities/project/project.entity";
import { SentryProjectEntity } from "./database/entities/sentry/sentry-project.entity";
import { SentryTeamEntity } from "./database/entities/sentry/sentry-team.entity";
import { SentryOrganizationUserEntity } from "./database/entities/sentry/sentry-organization-user.entity";
import AppDataSource from "./database/datasource.config";
import { SentryStatisticController } from "./controllers/sentry/sentry-statistic.controller";


export default function configureDI() {
    const container: DIContainer<{
        [key: string]: any;
    }> = new DIContainer();

    container.add({
        /** External Repositories */
        [SentryApiProjectRepository.name]: new SentryApiProjectRepository,
        [SentryApiTeamRepository.name]: new SentryApiTeamRepository,
        [SentryApiOrganizationUserRepository.name]: new SentryApiOrganizationUserRepository,
        [SentryApiOrganizationProjectRepository.name]: new SentryApiOrganizationProjectRepository,

        /** Repositories */
        [SentryProjectRepository.name]: object(SentryProjectRepository).construct(
            AppDataSource.getRepository(SentryProjectEntity),
        ),
        [SentryTeamRepository.name]: object(SentryTeamRepository).construct(
            AppDataSource.getRepository(SentryTeamEntity),
        ),
        [ProjectRepository.name]: object(ProjectRepository).construct(
            AppDataSource.getRepository(ProjectEntity),
        ),
        [SentryOrganizationUserRepository.name]: object(SentryOrganizationUserRepository).construct(
            AppDataSource.getRepository(SentryOrganizationUserEntity),
        ),

        /** Services */
        [SentryProjectService.name]: object(SentryProjectService).construct(
            use(SentryProjectRepository),
            use(SentryApiOrganizationProjectRepository),
            use(SentryTeamRepository),
        ),
        [SentryTeamService.name]: object(SentryTeamService).construct(
            use(SentryTeamRepository),
            use(SentryApiTeamRepository),
        ),
        [SentryOrganizationUserService.name]: object(SentryOrganizationUserService).construct(
            use(SentryOrganizationUserRepository),
            use(SentryApiOrganizationUserRepository),
        ),

        /** Controllers */
        [SentryProjectController.name]: object(SentryProjectController).construct(
            use(SentryProjectService),
        ),
        [SentryStatisticController.name]: object(SentryStatisticController).construct(
            use(SentryProjectService),
        ),

        /** Scheduler */
        [SentryProjectSyncScheduler.name]: object(SentryProjectSyncScheduler).construct(
            use(SentryProjectService)
        ),
        [SentryTeamSyncScheduler.name]: object(SentryTeamSyncScheduler).construct(
            use(SentryTeamService)
        ),
        [SentryOrganizationUserScheduler.name]: object(SentryOrganizationUserScheduler).construct(
            use(SentryOrganizationUserService),
        ),
    });

    return container;
}
