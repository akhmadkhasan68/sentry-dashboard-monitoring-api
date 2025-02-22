import { SentryInviteStatusEnum } from "../../enums/sentry-invite-status.enum";
import { SentryRoleEnum, SentryRoleNameEnum } from "../../enums/sentry-role.enum";
import { SentryUserDto } from "./sentry-user.dto";

export interface SentryOrganizationUserList {
    id:           string;
    email:        string;
    name:         string;
    user:         SentryUserDto;
    orgRole:      SentryRoleEnum;
    pending:      boolean;
    expired:      boolean;
    flags:        Flags;
    dateCreated:  Date;
    inviteStatus: SentryInviteStatusEnum;
    inviterName:  null | string;
    role:         SentryRoleEnum;
    roleName:     SentryRoleNameEnum;
    projects:     string[];
}

export interface Flags {
    "idp:provisioned":         boolean;
    "idp:role-restricted":     boolean;
    "sso:linked":              boolean;
    "sso:invalid":             boolean;
    "member-limit:restricted": boolean;
    "partnership:restricted":  boolean;
}
