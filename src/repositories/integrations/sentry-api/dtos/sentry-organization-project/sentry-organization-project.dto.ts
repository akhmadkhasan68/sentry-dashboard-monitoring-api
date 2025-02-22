import { SentryOrganizationProjectTeamDto } from "./sentry-organization-project-team.dto";

export interface SentryOrganizationProjectListDto {
    team:                     SentryOrganizationProjectTeamDto;
    teams:                    SentryOrganizationProjectTeamDto[];
    id:                       string;
    name:                     string;
    slug:                     string;
    isBookmarked:             boolean;
    isMember:                 boolean;
    access:                   any[];
    hasAccess:                boolean;
    dateCreated:              Date;
    environments:             string[];
    eventProcessing:          EventProcessing;
    features:                 string[];
    firstEvent:               Date | null;
    firstTransactionEvent:    boolean;
    hasSessions:              boolean;
    hasProfiles:              boolean;
    hasReplays:               boolean;
    hasFeedbacks:             boolean;
    hasNewFeedbacks:          boolean;
    hasCustomMetrics:         boolean;
    hasMonitors:              boolean;
    hasMinifiedStackTrace:    boolean;
    hasInsightsHttp:          boolean;
    hasInsightsDb:            boolean;
    hasInsightsAssets:        boolean;
    hasInsightsAppStart:      boolean;
    hasInsightsScreenLoad:    boolean;
    hasInsightsVitals:        boolean;
    hasInsightsCaches:        boolean;
    hasInsightsQueues:        boolean;
    hasInsightsLlmMonitoring: boolean;
    platform:                 null | string;
    platforms:                string[];
    latestRelease:            LatestRelease | null;
    hasUserReports:           boolean;
    latestDeploys:            null;
}

export interface EventProcessing {
    symbolicationDegraded: boolean;
}

export interface LatestRelease {
    version: string;
}
