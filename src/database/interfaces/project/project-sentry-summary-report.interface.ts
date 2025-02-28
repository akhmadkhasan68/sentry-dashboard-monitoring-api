import { IBase } from "../base.interface";
import { ISentryProject } from "../sentry/sentry-project.interface";
import { IProject } from "./project.interface";

export interface IProjectSentrySummaryReport extends IBase {
    projectId: string;
    sentryProjectId: string;
    serviceName: string | null;
    totalIssueUnresolved: number;

    /* Relations */
    project?: IProject;
    sentryProject?: ISentryProject;
}
