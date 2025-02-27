import { IBase } from "@database/interfaces/base.interface";
import { ISentryTeam } from "@database/interfaces/sentry/sentry-team.interface";
import { SentryProjectTypeEnum } from "@utils/enums/sentry-project-type.enum";

export interface ISentryProject extends IBase {
    sentryTeamId: string;
    sentryProjectId: string;
    sentryProjectName: string;
    sentryProjectSlug: string;
    sentryProjectPlatform: string;
    type: SentryProjectTypeEnum;

    /* Relations */
    sentryTeam?: ISentryTeam;
}
