import { IBase } from "./base.interface";
import { ISentryTeam } from "./sentry/sentry-team.interface";

export interface IProject extends IBase {
    name: string;
    description?: string;

    /* Relations */
    sentryTeams?: ISentryTeam[];
}
