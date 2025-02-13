import DIContainer, { IDIContainer, object, use } from "rsdi";
import { SentryProjectService } from "./services/sentry/sentry-project.service";
import { SentryProjectRepository } from "./repositories/sentry/sentry-project.repository";
import { SentryTeamRepository } from "./repositories/sentry/sentry-team.repository";
import { ProjectRepository } from "./repositories/project.repository";
import { SentryTeamService } from "./services/sentry/sentry-team.service";
import { SentryProjectSyncScheduler } from "./scheduler/sentry-project-sync.scheduler";
import { SentryProjectController } from "./controllers/sentry/sentry-project.controller";


export default function configureDI() {
    const container: DIContainer<{
        [key: string]: any;
    }> = new DIContainer();

    container.add({
        /** Repositories */
        [SentryProjectRepository.name]: new SentryProjectRepository,
        [SentryTeamRepository.name]: new SentryTeamRepository,
        [ProjectRepository.name]: new ProjectRepository,

        /** Services */
        [SentryProjectService.name]: object(SentryProjectService).construct(
            use(SentryProjectRepository)
        ),
        [SentryTeamService.name]: object(SentryTeamService).construct(
            use(SentryTeamRepository)
        ),

        // [TwitterDirectMessageService.name]: object(TwitterDirectMessageService).construct(
        //     twitterClient
        // ),
        // [TwitterTweetService.name]: object(TwitterTweetService).construct(
        //     twitterClient
        // ),
        // [TwitterMediaService.name]: object(TwitterMediaService).construct(
        //     twitterClient
        // ),

        /** Controllers */
        [SentryProjectController.name]: object(SentryProjectController).construct(
            use(SentryProjectService),
        ),

        /** Scheduler */
        [SentryProjectSyncScheduler.name]: object(SentryProjectSyncScheduler).construct(
            use(SentryProjectService)
        ),
    });

    return container;
}
