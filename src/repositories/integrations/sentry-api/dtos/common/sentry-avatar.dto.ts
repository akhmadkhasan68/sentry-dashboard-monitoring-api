import { AvatarTypeEnum } from "../../enums/sentry-avatar-type.enum";

export interface SentryAvatarDto {
    avatarType: AvatarTypeEnum;
    avatarUuid: null;
    avatarUrl?: string;
}
