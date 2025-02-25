import { SentryProjectListDto } from "./dtos/sentry-project/sentry-project-list.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiProjectRepository extends SentryAPIBaseRepository {
    constructor() {
        super();
    }

    async fetchProjects(): Promise<SentryProjectListDto[]> {
        const response = await this.axiosFetcher.get('0/projects/');

        return response.data;
    }
}
