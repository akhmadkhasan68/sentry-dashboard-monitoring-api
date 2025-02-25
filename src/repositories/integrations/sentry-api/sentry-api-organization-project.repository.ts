import { SentryOrganizationConstant } from "./constants/sentry-organization.constant";
import { SentryOrganizationProjectIssuesListDto } from "./dtos/sentry-organization-project/sentry-organization-project-issue.dto";
import { SentryOrganizationProjectListDto } from "./dtos/sentry-organization-project/sentry-organization-project.dto";
import { SentryAPIBaseRepository } from "./sentry-api-base.repository";

export class SentryApiOrganizationProjectRepository extends SentryAPIBaseRepository {
    private organizationSlug = SentryOrganizationConstant.DEFAULT;

    constructor() {
        super();
    }

    async fetchOrganizationProjects(): Promise<SentryOrganizationProjectListDto[]> {
        const response = await this.axiosFetcher.get(`0/organizations/${this.organizationSlug}/projects/`, {
            all_projects: 1
        });

        return response.data;
    }

    async fetchOrganizationProjectUnresolvedIssues(projectSlug: string): Promise<any[]> {
        let hasNextResult = true;
        let nextCursor = '';
        let results: SentryOrganizationProjectIssuesListDto[] = [];

        while (hasNextResult) {
            // Query for unresolved issues with pagination
            const params: {
                query: string;
                cursor?: string;
            } = {
                query: 'is:unresolved', // Filter for unresolved issues
                cursor: nextCursor
            };

            const response = await this.axiosFetcher.get<SentryOrganizationProjectIssuesListDto[]>(`0/projects/${this.organizationSlug}/${projectSlug}/issues/`, params);

            const responseData = response.data;
            const responseHeader = response.headers;
            const responseHeaderLink = responseHeader.link as string;

            const [
                linkPrevious,
                linkNext
            ] = responseHeaderLink?.split(',');

            if (!linkPrevious || !linkNext) {
                throw new Error('Link header not found');
            }

            const [
                linkNextUrl,
                linkNextRel,
                linkNextResult,
                linkNextCursor
            ] = linkNext.split(';');

            const linkNextResultValue = linkNextResult.split('=')[1];
            const linkNextCursorValue = linkNextCursor.split('=')[1];

            if (JSON.parse(linkNextResultValue) === "true") {
                nextCursor = JSON.parse(linkNextCursorValue);
                hasNextResult = true;
            } else {
                hasNextResult = false;
            }

            results = results.concat(responseData);
        }

        return results;
    }
}
