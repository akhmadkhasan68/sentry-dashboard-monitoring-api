import DIContainer from "rsdi/dist";
import { SentryProjectSyncScheduler } from "./scheduler/sentry-project-sync.scheduler";
import { SentryTeamSyncScheduler } from "./scheduler/sentry-team-sync.scheduler";

export class SchedulerService {
    private readonly diContainer: DIContainer<{[key: string]: any;}>

    constructor(
        diContainer: DIContainer<{[key: string]: any;}>
    ) {
        this.diContainer = diContainer;
    }

    public start() {
        this.diContainer.get<SentryProjectSyncScheduler>(SentryProjectSyncScheduler.name).initScheduler();
        this.diContainer.get<SentryTeamSyncScheduler>(SentryTeamSyncScheduler.name).initScheduler();
    }
}
