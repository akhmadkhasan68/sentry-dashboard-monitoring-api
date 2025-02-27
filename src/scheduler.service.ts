import DIContainer from "rsdi/dist";
import { SentryProjectSyncScheduler } from "@scheduler/sentry-project-sync.scheduler";
import { SentryTeamSyncScheduler } from "@scheduler/sentry-team-sync.scheduler";
import { SentryOrganizationUserScheduler } from "@scheduler/sentry-organization-user.scheduler";

export class SchedulerService {
    private readonly diContainer: DIContainer<{[key: string]: any;}>

    constructor(
        diContainer: DIContainer<{[key: string]: any;}>
    ) {
        this.diContainer = diContainer;
    }

    public async start() {
        this.diContainer.get<SentryTeamSyncScheduler>(SentryTeamSyncScheduler.name).initScheduler();
        this.diContainer.get<SentryOrganizationUserScheduler>(SentryOrganizationUserScheduler.name).initScheduler();
        this.diContainer.get<SentryProjectSyncScheduler>(SentryProjectSyncScheduler.name).initScheduler();
    }
}
