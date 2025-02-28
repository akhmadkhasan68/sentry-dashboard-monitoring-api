import { IProjectSentrySummaryReport } from "@database/interfaces/project/project-sentry-summary-report.interface";
import { ProjectSentrySummaryReportService } from "@services/project/project-sentry-summary-report.service";
import { ResponseFormat } from "@utils/response";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { ProjectSentrySummaryReportDto } from "./dtos/project-sentry-summary-report.dto";

export class ProjectSentrySummaryReportController {
    constructor(
        private readonly projectSentrySummaryReportService: ProjectSentrySummaryReportService,
    ) {}

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.projectSentrySummaryReportService.findAllWithRelations();
            const responseData: ProjectSentrySummaryReportDto[] = data.map((item) => ProjectSentrySummaryReportDto.parse(item));

            res.status(HttpStatusCode.Ok).json(ResponseFormat.successResponse<ProjectSentrySummaryReportDto[]>("OK", HttpStatusCode.Ok, responseData));
        } catch (error) {
            next(error);
        }
    }

    public async findByProjectId(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = req.params.projectId;
            const data = await this.projectSentrySummaryReportService.findByProjectId(projectId);
            const responseData: ProjectSentrySummaryReportDto[] = data.map((item) => ProjectSentrySummaryReportDto.parse(item));

            res.status(HttpStatusCode.Ok).json(ResponseFormat.successResponse<ProjectSentrySummaryReportDto[]>("OK", HttpStatusCode.Ok, responseData));
        } catch (error) {
            next(error);
        }
    }

    public async generateProjectSentryIssueUnresolvedReport(req: Request, res: Response, next: NextFunction) {
        try {
            const projectId = req.params.projectId;
            const data = await this.projectSentrySummaryReportService.generateProjectSentryIssueUnresolvedReport(projectId);

            res.status(HttpStatusCode.Ok).json(ResponseFormat.successResponse<IProjectSentrySummaryReport[]>("OK", HttpStatusCode.Ok, data));
        } catch (error) {
            next(error);
        }
    }
}
