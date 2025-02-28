import { IProjectSentrySummaryReport } from "@database/interfaces/project/project-sentry-summary-report.interface";

export class ProjectSentrySummaryReportDto {
    projectName: string;
    sentryProjectName: string;
    serviceName: string | null;
    type: string;
    totalIssueUnresolved: number;

    constructor(data: IProjectSentrySummaryReport) {
        this.projectName = data.project?.name ?? "";
        this.sentryProjectName = "#" + (data.sentryProject?.sentryProjectName ?? "");
        this.serviceName = data.serviceName;
        this.type = data.sentryProject?.type.toString() ?? "";
        this.totalIssueUnresolved = data.totalIssueUnresolved;
    }

    static parse(data: IProjectSentrySummaryReport): ProjectSentrySummaryReportDto {
        return new ProjectSentrySummaryReportDto(data);
    }
}
