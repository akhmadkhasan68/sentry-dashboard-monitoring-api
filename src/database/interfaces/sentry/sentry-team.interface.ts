import { IBase } from "../base.interface";
import { IProject } from "../project.interface";
import { ISentryProject } from "./sentry-project.interface";

export interface ISentryTeam extends IBase {
    projectId?: string;
    sentryTeamId: string;
    sentryTeamSlug: string;
    sentryTeamName: string;
    sentryMemberCount: number;

    /* Relations */
    project?: IProject;
    sentryProjects?: ISentryProject[];
}
