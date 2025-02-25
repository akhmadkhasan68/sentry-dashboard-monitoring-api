import { IBase } from "./../base.interface";
import { ISentryTeam } from "./sentry-team.interface";

export interface ISentryProject extends IBase {
    sentryTeamId: string;
    sentryProjectId: string;
    sentryProjectName: string;
    sentryProjectSlug: string;
    sentryProjectPlatform?: string | null;

    /* Relations */
    sentryTeam?: ISentryTeam;
}
