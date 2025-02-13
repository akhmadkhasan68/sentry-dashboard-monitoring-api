import { SentryOrganizationConstant } from "./constants/sentry-organization.constant";
import { SentryTeamListDto } from "./dtos/sentry-team/sentry-team-list.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiTeamRepository extends SentryAPIBaseRepository {
    constructor() {
        super();
    }

    async fetchOrganizationTeams(): Promise<SentryTeamListDto[]> {
        const organizationSlug = SentryOrganizationConstant.DEFAULT;

        return await this.axiosFetcher.get(`0/organizations/${organizationSlug}/teams/`);
    }
}
