import { IBase } from "../base.interface";

export interface ISentryTeam extends IBase {
    projectId?: string;
    sentryTeamId: string;
    sentryTeamSlug: string;
    sentryTeamName: string;
    sentryMemberCount: number;
}
