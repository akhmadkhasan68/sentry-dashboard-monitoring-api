import { IBase } from "../base.interface";

export interface ISentryTeamProjectStatistic extends IBase {
    sentryProjectId: string;
    sentryTeamId: string;
    totalIssueResolved: number;
}
