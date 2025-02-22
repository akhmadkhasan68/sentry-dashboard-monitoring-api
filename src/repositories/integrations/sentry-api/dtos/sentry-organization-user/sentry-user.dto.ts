import { SentryAvatarDto } from "../common/sentry-avatar.dto";
import { SentryEmailDto } from "../common/sentry-email.dto";

export interface SentryUserDto {
    id:              string;
    name:            string;
    username:        string;
    email:           string;
    avatarUrl:       string;
    isActive:        boolean;
    hasPasswordAuth: boolean;
    isManaged:       boolean;
    dateJoined:      Date;
    lastLogin:       Date;
    has2fa:          boolean;
    lastActive:      Date;
    isSuperuser:     boolean;
    isStaff:         boolean;
    emails:          SentryEmailDto[];
    avatar:          SentryAvatarDto;
}
