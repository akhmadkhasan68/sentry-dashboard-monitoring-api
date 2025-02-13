import { SentryProjectModel } from "../../database/models/sentry/sentry-project.model";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";

export class SentryProjectRepository {
    public async create(data: ISentryProject): Promise<ISentryProject> {
        return await SentryProjectModel.create({
            sentryProjectId: data.sentryProjectId,
            sentryProjectName: data.sentryProjectName,
            sentryProjectSlug: data.sentryProjectSlug,
        });
    }
}
