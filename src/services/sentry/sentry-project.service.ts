import { SentryProjectRepository } from "../../repositories/sentry/sentry-project.repository";

export class SentryProjectService {
    constructor(
        private readonly sentryProjectRepository: SentryProjectRepository,
    ) {}
}
