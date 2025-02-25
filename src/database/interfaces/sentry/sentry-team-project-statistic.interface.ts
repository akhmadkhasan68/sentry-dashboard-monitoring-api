import { IBase } from "../base.interface";

export interface ISentryTeamProjectStatistic extends IBase {
    sentryProjectId: string;
    totalIssueResolved: number;
}
