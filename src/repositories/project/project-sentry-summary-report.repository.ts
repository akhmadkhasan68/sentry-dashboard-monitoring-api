import { ProjectSentrySummaryReportEntity } from "@database/entities/project/project-sentry-summary-report.entity";
import { IProjectSentrySummaryReport } from "@database/interfaces/project/project-sentry-summary-report.interface";
import { FindOptionsWhere, Repository } from "typeorm";

export class ProjectSentrySummaryReportRepository {
    constructor(
        private readonly projectSentrySummaryReportRepository: Repository<ProjectSentrySummaryReportEntity>,
    ) {}

    public async findAllWithRelations(): Promise<IProjectSentrySummaryReport[]> {
        return await this.projectSentrySummaryReportRepository.find({
            relations: [
                "project",
                "sentryProject",
            ],
            order: {
                projectId: "ASC",
            }
        });
    }

    public async findByConditionsWithRelations(conditions: FindOptionsWhere<IProjectSentrySummaryReport>): Promise<IProjectSentrySummaryReport[]> {
        return await this.projectSentrySummaryReportRepository.find({
            where: conditions,
            relations: [
                "project",
                "sentryProject",
            ]
        });
    }

    public async findAll(): Promise<IProjectSentrySummaryReport[]> {
        return await this.projectSentrySummaryReportRepository.find();
    }

    public async findByIdWithRelations(id: string): Promise<IProjectSentrySummaryReport> {
        return await this.projectSentrySummaryReportRepository.findOneOrFail({
            where: { id },
            relations: [
                "project",
                "sentryProject",
            ]
        });
    }

    public async bulkCreate(data: IProjectSentrySummaryReport[]): Promise<IProjectSentrySummaryReport[]> {
        return await this.projectSentrySummaryReportRepository.save(data);
    }

    public async bulkUpdate(data: IProjectSentrySummaryReport[]): Promise<IProjectSentrySummaryReport[]> {
        return await this.projectSentrySummaryReportRepository.save(data);
    }
}
