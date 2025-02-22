import { SentryProjectModel } from "../../database/models/sentry/sentry-project.model";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";

export class SentryProjectRepository {
    public async findAll(): Promise<ISentryProject[]> {
        return await SentryProjectModel.findAll();
    }

    public async create(data: ISentryProject): Promise<ISentryProject> {
        return await SentryProjectModel.create({
            sentryProjectId: data.sentryProjectId,
            sentryProjectName: data.sentryProjectName,
            sentryProjectSlug: data.sentryProjectSlug,
        });
    }

    public async bulkCreate(datas: ISentryProject[]): Promise<ISentryProject[]> {
        return await SentryProjectModel.bulkCreate(datas.map((data) => {
            return {
                sentryProjectId: data.sentryProjectId,
                sentryProjectName: data.sentryProjectName,
                sentryProjectSlug: data.sentryProjectSlug,
            };
        }));
    }

    public async bulkUpdate(datas: ISentryProject[]): Promise<ISentryProject[]> {
        return await Promise.all(datas.map(async (data) => {
            const project = await SentryProjectModel.findByPk(data.id);

            if (!project) {
                throw new Error(`Project with id ${data.id} not found`);
            }

            return await project.update({
                sentryProjectId: data.sentryProjectId,
                sentryProjectName: data.sentryProjectName,
                sentryProjectSlug: data.sentryProjectSlug,
            });
        }));
    }
}
