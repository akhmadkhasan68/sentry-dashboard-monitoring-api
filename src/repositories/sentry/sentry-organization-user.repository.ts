import { ISentryOrganizationUser } from "../../database/interfaces/sentry/sentry-organization-user.interface";
import { SentryOrganizationUserModel } from "../../database/models/sentry/sentry-organization-user.model";

export class SentryOrganizationUserRepository {
    public async findAll(): Promise<ISentryOrganizationUser[]> {
        return await SentryOrganizationUserModel.findAll();
    }

    public async create(data: ISentryOrganizationUser): Promise<ISentryOrganizationUser> {
        return await SentryOrganizationUserModel.create({
            sentryUserId: data.sentryUserId,
            sentryUserEmail: data.sentryUserEmail,
            sentryUserName: data.sentryUserName,
        });
    }

    public async bulkCreate(datas: ISentryOrganizationUser[]): Promise<ISentryOrganizationUser[]> {
        return await SentryOrganizationUserModel.bulkCreate(datas.map((data) => {
            return {
                sentryUserId: data.sentryUserId,
                sentryUserEmail: data.sentryUserEmail,
                sentryUserName: data.sentryUserName,
            };
        }));
    }

    public async bulkUpdate(datas: ISentryOrganizationUser[]): Promise<ISentryOrganizationUser[]> {
        return await Promise.all(datas.map(async (data) => {
            const organizationUser = await SentryOrganizationUserModel.findByPk(data.id);

            if (!organizationUser) {
                throw new Error(`Organization User with id ${data.id} not found`);
            }

            return await organizationUser.update({
                sentryUserId: data.sentryUserId,
                sentryUserEmail: data.sentryUserEmail,
                sentryUserName: data.sentryUserName,
            });
        }));
    }
}
