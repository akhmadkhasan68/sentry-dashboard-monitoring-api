import { SentryProjectModel } from "../../database/models/sentry/sentry-project.model";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";
import { IPaginationResponse } from "../../utils/interfaces/response/response.interface";
import { IPaginationRequest } from "../../utils/interfaces/request/pagination-request.interface";
import { Op } from "sequelize";

export class SentryProjectRepository {
    public async paginate(request: IPaginationRequest<null>): Promise<IPaginationResponse<ISentryProject>> {
        const { 
            page, 
            perPage,
            search,
            sort,
            order,
            filters,
        } = request;

        const offset = (page - 1) * perPage;
        const where = {};

        if (search) {
            Object.assign(where, {
                sentryProjectName: {
                    [Op.like]: `%${search}%`,
                },
            });
        }

        if (filters) {
            Object.assign(where, filters);
        }

        const { count, rows } = await SentryProjectModel.findAndCountAll({
            where,
            limit: perPage,
            offset,
            order: [[sort, order]],
        });

        return {
            items: rows,
            meta: {
                page,
                perPage,
                total: count,
                totalPages: Math.ceil(count / perPage),
            },
        };
    }

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
