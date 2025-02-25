import { SentryOrganizationConstant } from "./constants/sentry-organization.constant";
import { SentryOrganizationUserList } from "./dtos/sentry-organization-user/sentry-organization-user-list.dto";
import { SentryTeamListDto } from "./dtos/sentry-team/sentry-team-list.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiTeamRepository extends SentryAPIBaseRepository {
    private organizationSlug = SentryOrganizationConstant.DEFAULT;

    constructor() {
        super();
    }

    async fetchOrganizationTeams(): Promise<SentryTeamListDto[]> {
        const response = await this.axiosFetcher.get(`0/organizations/${this.organizationSlug}/teams/`);

        return response.data;
    }

    async fetchTeamMembers(teamSlug: string): Promise<SentryOrganizationUserList[]> {
        const response = await this.axiosFetcher.get(`0/teams/${this.organizationSlug}/${teamSlug}members/`);

        return response.data;
    }
}
