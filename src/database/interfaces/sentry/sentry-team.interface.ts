import { IBase } from "@database/interfaces/base.interface";
import { IProject } from "@database/interfaces/project.interface";
import { ISentryProject } from "@database/interfaces/sentry/sentry-project.interface";

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
