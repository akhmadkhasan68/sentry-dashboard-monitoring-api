import { SentryTeamProjectStatisticRepository } from "@repositories/sentry/sentry-team-project-statistic.repository";

export class SentryTeamProjectStatisticService {
    constructor(
        private readonly sentryTeamProjectStatisticRepository: SentryTeamProjectStatisticRepository,
    ) {}


}
