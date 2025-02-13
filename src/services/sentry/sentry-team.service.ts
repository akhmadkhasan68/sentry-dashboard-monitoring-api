import { SentryTeamRepository } from "../../repositories/sentry/sentry-team.repository";

export class SentryTeamService {
    constructor(
        private readonly sentryTeamRepository: SentryTeamRepository,
    ) {}
}
