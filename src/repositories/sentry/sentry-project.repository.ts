import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";
import { IPaginationResponse } from "../../utils/interfaces/response/response.interface";
import { IPaginationRequest } from "../../utils/interfaces/request/pagination-request.interface";
import { Repository } from "typeorm";
import { SentryProjectEntity } from "../../database/entities/sentry/sentry-project.entity";

export class SentryProjectRepository {
    constructor(
        private readonly SentryProjectEntity: Repository<SentryProjectEntity>,
    ) {}

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

        const query = this.SentryProjectEntity.createQueryBuilder(SentryProjectEntity.name);

        if (search) {
            query.where("sentryProjectName LIKE :search", { search: `%${search}%` });
        }

        if (filters) {
            Object.keys(filters).forEach((key) => {
                query.andWhere(`${key} = :${key}`, { [key]: filters[key] });
            });
        }

        const [items, total] = await query
            .orderBy(sort ?? "createdAt", order)
            .skip(offset)
            .take(perPage)
            .getManyAndCount();

        return {
            items,
            meta: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            },
        };
    }

    public async findAll(): Promise<ISentryProject[]> {
        return await this.SentryProjectEntity.find();
    }

    public async create(data: ISentryProject): Promise<ISentryProject> {
        return await this.SentryProjectEntity.save(data);
    }

    public async bulkCreate(datas: ISentryProject[]): Promise<ISentryProject[]> {
        return await this.SentryProjectEntity.save(datas.map((data) => {
            return {
                sentryTeamId: data.sentryTeamId,
                sentryProjectId: data.sentryProjectId,
                sentryProjectName: data.sentryProjectName,
                sentryProjectSlug: data.sentryProjectSlug,
                sentryProjectPlatform: data.sentryProjectPlatform,
                type: data.type,
            };
        }));
    }

    public async bulkUpdate(datas: ISentryProject[]): Promise<ISentryProject[]> {
        return await Promise.all(datas.map(async (data) => {
            const project = await this.SentryProjectEntity.findOne({
                where: {
                    id: data.id,
                },
            });

            if (!project) {
                throw new Error(`Project with id ${data.id} not found`);
            }

            return await this.SentryProjectEntity.save({
                ...project,
                sentryTeamId: data.sentryTeamId,
                sentryProjectId: data.sentryProjectId,
                sentryProjectName: data.sentryProjectName,
                sentryProjectSlug: data.sentryProjectSlug,
                sentryProjectPlatform: data.sentryProjectPlatform,
                type: data.type,
            });
        }));
    }
}
