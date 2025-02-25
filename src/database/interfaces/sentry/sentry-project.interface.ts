import { IBase } from "@database/interfaces/base.interface";
import { ISentryTeam } from "@database/interfaces/sentry/sentry-team.interface";

export interface ISentryProject extends IBase {
    sentryTeamId: string;
    sentryProjectId: string;
    sentryProjectName: string;
    sentryProjectSlug: string;
    sentryProjectPlatform?: string | null;

    /* Relations */
    sentryTeam?: ISentryTeam;
}
