import { ISentryTeam } from "../../database/interfaces/sentry/sentry-team.interface";
import { SentryTeamModel } from "../../database/models/sentry/sentry-team.model";

export class SentryTeamRepository {
    public async create(data: ISentryTeam): Promise<ISentryTeam> {
        return await SentryTeamModel.create({
            sentryTeamId: data.sentryTeamId,
            sentryTeamSlug: data.sentryTeamSlug,
            sentryTeamName: data.sentryTeamName,
            sentryMemberCount: data.sentryMemberCount,
        });
    }
}
