import { IBase } from "@database/interfaces/base.interface";
import { IProject } from "@database/interfaces/project/project.interface";
import { ISentryProject } from "@database/interfaces/sentry/sentry-project.interface";
import { IProjectSentryTeam } from "../project/project-sentry-team.interface";

export interface ISentryTeam extends IBase {
    sentryTeamId: string;
    sentryTeamSlug: string;
    sentryTeamName: string;
    sentryMemberCount: number;

    /* Relations */
    sentryProjects?: ISentryProject[];
    projectSentryTeams?: IProjectSentryTeam[];
}
