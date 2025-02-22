import { ISentryTeam } from "../../database/interfaces/sentry/sentry-team.interface";
import { SentryTeamModel } from "../../database/models/sentry/sentry-team.model";

export class SentryTeamRepository {
    public async findAll(): Promise<ISentryTeam[]> {
        return await SentryTeamModel.findAll();
    }

    public async create(data: ISentryTeam): Promise<ISentryTeam> {
        return await SentryTeamModel.create({
            sentryTeamId: data.sentryTeamId,
            sentryTeamSlug: data.sentryTeamSlug,
            sentryTeamName: data.sentryTeamName,
            sentryMemberCount: data.sentryMemberCount,
        });
    }

    public async bulkCreate(datas: ISentryTeam[]): Promise<ISentryTeam[]> {
        return await SentryTeamModel.bulkCreate(datas.map((data) => {
            return {
                sentryTeamId: data.sentryTeamId,
                sentryTeamSlug: data.sentryTeamSlug,
                sentryTeamName: data.sentryTeamName,
                sentryMemberCount: data.sentryMemberCount,
            };
        }));
    }

    public async bulkUpdate(datas: ISentryTeam[]): Promise<ISentryTeam[]> {
        return await Promise.all(datas.map(async (data) => {
            const team = await SentryTeamModel.findByPk(data.id);

            if (!team) {
                throw new Error(`Team with id ${data.id} not found`);
            }

            return await team.update({
                sentryTeamId: data.sentryTeamId,
                sentryTeamSlug: data.sentryTeamSlug,
                sentryTeamName: data.sentryTeamName,
                sentryMemberCount: data.sentryMemberCount,
            });
        }));
    }
}
