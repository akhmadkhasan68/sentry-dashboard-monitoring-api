import { IBase } from "../base.interface";
import { ISentryTeam } from "../sentry/sentry-team.interface";
import { IProject } from "./project.interface";

export interface IProjectSentryTeam extends IBase {
    projectId: string;
    sentryTeamId: string;

    /** Relations */
    project?: IProject;
    sentryTeam?: ISentryTeam;
}
