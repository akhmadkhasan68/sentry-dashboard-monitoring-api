import { SentryOrganizationConstant } from "./constants/sentry-organization.constant";
import { SentryOrganizationProjectListDto } from "./dtos/sentry-organization-project/sentry-organization-project.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiOrganizationProjectRepository extends SentryAPIBaseRepository {
    private organizationSlug = SentryOrganizationConstant.DEFAULT;

    constructor() {
        super();
    }

    async fetchOrganizationProjects(): Promise<SentryOrganizationProjectListDto[]> {
        return await this.axiosFetcher.get(`0/organizations/${this.organizationSlug}/projects/`, {
            all_projects: 1
        });
    }
}
