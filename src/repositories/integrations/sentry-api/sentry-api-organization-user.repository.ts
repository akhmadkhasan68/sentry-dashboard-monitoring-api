import { SentryOrganizationConstant } from "./constants/sentry-organization.constant";
import { SentryOrganizationUserList } from "./dtos/sentry-organization-user/sentry-organization-user-list.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiOrganizationUserRepository extends SentryAPIBaseRepository {
    constructor() {
        super();
    }

    async fetchOrganizationUsers(): Promise<SentryOrganizationUserList[]> {
        const organizationSlug = SentryOrganizationConstant.DEFAULT;

        return await this.axiosFetcher.get(`0/organizations/${organizationSlug}/users/`);
    }
}
