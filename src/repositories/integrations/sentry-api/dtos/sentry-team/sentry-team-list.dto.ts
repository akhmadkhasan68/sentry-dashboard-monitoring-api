import { SentryAvatarDto } from "../common/sentry-avatar.dto";
import { SentryProjectListDto } from "../sentry-project/sentry-project-list.dto";

export interface SentryTeamListDto {
    id:            string;
    slug:          string;
    name:          string;
    dateCreated:   Date;
    isMember:      boolean;
    teamRole:      null;
    flags:         {
        "idp:provisioned": boolean;
    };
    access:        string[];
    hasAccess:     boolean;
    isPending:     boolean;
    memberCount:   number;
    avatar:        SentryAvatarDto;
    externalTeams: string[];
    projects:      SentryProjectListDto[];
}
