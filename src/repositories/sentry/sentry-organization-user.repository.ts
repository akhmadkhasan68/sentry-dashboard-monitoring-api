import { Repository } from "typeorm";
import { ISentryOrganizationUser } from "../../database/interfaces/sentry/sentry-organization-user.interface";
import { SentryOrganizationUserEntity } from "../../database/entities/sentry/sentry-organization-user.entity";

export class SentryOrganizationUserRepository {
    constructor(
        private readonly sentryOrganizationUserRepository: Repository<SentryOrganizationUserEntity>,
    ) {}

    public async findAll(): Promise<ISentryOrganizationUser[]> {
        return await this.sentryOrganizationUserRepository.find();
    }

    public async create(data: ISentryOrganizationUser): Promise<ISentryOrganizationUser> {
        return await this.sentryOrganizationUserRepository.save(data);
    }

    public async bulkCreate(datas: ISentryOrganizationUser[]): Promise<ISentryOrganizationUser[]> {
        return await this.sentryOrganizationUserRepository.save(datas.map((data) => {
            return {
                sentryUserId: data.sentryUserId,
                sentryUserEmail: data.sentryUserEmail,
                sentryUserName: data.sentryUserName,
            };
        }));
    }

    public async bulkUpdate(datas: ISentryOrganizationUser[]): Promise<ISentryOrganizationUser[]> {
        return await Promise.all(datas.map(async (data) => {
            const organizationUser = await this.sentryOrganizationUserRepository.findOne({
                where: {
                    id: data.id,
                },
            });

            if (!organizationUser) {
                throw new Error(`Organization user with id ${data.id} not found`);
            }

            return await this.sentryOrganizationUserRepository.save({
                ...organizationUser,
                sentryUserId: data.sentryUserId,
                sentryUserEmail: data.sentryUserEmail,
                sentryUserName: data.sentryUserName,
            });
        }));
    }
}
