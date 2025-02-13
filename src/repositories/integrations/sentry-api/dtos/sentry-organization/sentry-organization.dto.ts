import { SentryOrganizationStatusEnum } from "../../enums/sentry-organization-status.enum";
import { SentryAvatarDto } from "../common/sentry-avatar.dto";

export interface SentryOrganizationDto {
    id: string;
    slug: string;
    status: {
        id:   SentryOrganizationStatusEnum;
        name: SentryOrganizationStatusEnum;
    };
    name: string;
    dateCreated: Date;
    isEarlyAdopter: boolean;
    require2FA: boolean;
    requireEmailVerification: boolean;
    avatar: SentryAvatarDto;
    allowMemberInvite: boolean;
    allowMemberProjectCreation: boolean;
    allowSuperuserAccess: boolean;
    links: Links;
    hasAuthProvider: boolean;
    features: string[];
    extraOptions: ExtraOptions;
}

export interface ExtraOptions {
    traces: Traces;
}

export interface Traces {
    spansExtractionDate:     number;
    checkSpanExtractionDate: boolean;
}

export interface Links {
    organizationUrl: string;
    regionUrl:       string;
}
