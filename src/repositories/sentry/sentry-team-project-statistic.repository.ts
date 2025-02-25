import { SentryTeamProjectStatisticEntity } from "../../database/entities/sentry/sentry-team-project-statistic.entity";
import { ISentryTeamProjectStatistic } from "../../database/interfaces/sentry/sentry-team-project-statistic.interface";
import { Repository } from "typeorm";

export class SentryTeamProjectStatisticRepository {
    constructor(
        private readonly sentryTeamProjectStatisticRepository: Repository<SentryTeamProjectStatisticEntity>,
    ) {}

    public async findAll(): Promise<ISentryTeamProjectStatistic[]> {
        return await this.sentryTeamProjectStatisticRepository.find();
    }

    public async bulkCreate(datas: ISentryTeamProjectStatistic[]): Promise<ISentryTeamProjectStatistic[]> {
        return await this.sentryTeamProjectStatisticRepository.save(datas.map((data) => {
            return {
                sentryProjectId: data.sentryProjectId,
                totalIssueResolved: data.totalIssueResolved
            };
        }));
    }

    public async bulkUpdate(datas: ISentryTeamProjectStatistic[]): Promise<ISentryTeamProjectStatistic[]> {
        return await Promise.all(datas.map(async (data) => {
            const sentryTeamProject = await this.sentryTeamProjectStatisticRepository.findOne({
                where: {
                    id: data.id,
                },
            });

            if (!sentryTeamProject) {
                throw new Error(`Team with id ${data.id} not found`);
            }

            return await this.sentryTeamProjectStatisticRepository.save({
                ...sentryTeamProject,
                sentryProjectId: data.sentryProjectId,
                totalIssueResolved: data.totalIssueResolved
            });
        }));
    }
}
