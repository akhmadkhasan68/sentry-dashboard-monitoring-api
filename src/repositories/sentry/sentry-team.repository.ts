import { Repository } from "typeorm";
import { ISentryTeam } from "../../database/interfaces/sentry/sentry-team.interface";
import { SentryTeamEntity } from "../../database/entities/sentry/sentry-team.entity";

export class SentryTeamRepository {
    constructor(
        private readonly sentryTeamRepository: Repository<SentryTeamEntity>,
    ) {}

    public async findAll(): Promise<ISentryTeam[]> {
        return await this.sentryTeamRepository.find();
    }

    public async create(data: ISentryTeam): Promise<ISentryTeam> {
        return await this.sentryTeamRepository.save(data);
    }

    public async bulkCreate(datas: ISentryTeam[]): Promise<ISentryTeam[]> {
        return await this.sentryTeamRepository.save(datas.map((data) => {
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
            const team = await this.sentryTeamRepository.findOne({
                where: {
                    id: data.id,
                },
            });

            if (!team) {
                throw new Error(`Team with id ${data.id} not found`);
            }

            return await this.sentryTeamRepository.save({
                ...team,
                sentryTeamId: data.sentryTeamId,
                sentryTeamSlug: data.sentryTeamSlug,
                sentryTeamName: data.sentryTeamName,
                sentryMemberCount: data.sentryMemberCount,
            });
        }));
    }
}
