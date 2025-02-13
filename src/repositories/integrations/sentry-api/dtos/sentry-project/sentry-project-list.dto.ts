import { SentryProjectStatusEnum } from "../../enums/sentry-project-status.enum";
import { SentryAvatarDto } from "../common/sentry-avatar.dto";
import { SentryOrganizationDto } from "../sentry-organization/sentry-organization.dto";

export interface SentryProjectListDto {
    id: string;
    slug: string;
    name: string;
    platform: string;
    dateCreated: Date;
    isBookmarked: boolean;
    isMember: boolean;
    features: string[];
    firstEvent: Date | null;
    firstTransactionEvent: boolean;
    access: any[];
    hasAccess: boolean;
    hasCustomMetrics: boolean;
    hasMinifiedStackTrace: boolean;
    hasMonitors: boolean;
    hasProfiles: boolean;
    hasReplays: boolean;
    hasFeedbacks: boolean;
    hasNewFeedbacks: boolean;
    hasSessions: boolean;
    hasInsightsHttp: boolean;
    hasInsightsDb: boolean;
    hasInsightsAssets: boolean;
    hasInsightsAppStart: boolean;
    hasInsightsScreenLoad: boolean;
    hasInsightsVitals: boolean;
    hasInsightsCaches: boolean;
    hasInsightsQueues: boolean;
    hasInsightsLlmMonitoring: boolean;
    isInternal: boolean;
    isPublic: boolean;
    avatar: SentryAvatarDto;
    color: string;
    status: SentryProjectStatusEnum;
    organization: SentryOrganizationDto;
}
