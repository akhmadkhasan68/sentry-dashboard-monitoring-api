import { IProjectSentrySummaryReport } from "@database/interfaces/project/project-sentry-summary-report.interface";
import { BaseEntity } from "../base.entity";
import { IProject } from "@database/interfaces/project/project.interface";
import { ISentryProject } from "@database/interfaces/sentry/sentry-project.interface";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { SentryProjectEntity } from "../sentry/sentry-project.entity";

@Entity({
    name: "project_sentry_summary_reports",
})
export class ProjectSentrySummaryReportEntity extends BaseEntity implements IProjectSentrySummaryReport {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    projectId: string;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryProjectId: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    serviceName: string;

    @Column({
        type: 'integer',
        nullable: false,
        default: 0,
    })
    totalIssueUnresolved: number;

    /* Relations */
    @ManyToOne(() => ProjectEntity, (project) => project.id)
    project?: IProject;

    @ManyToOne(() => SentryProjectEntity, (project) => project.id)
    sentryProject?: ISentryProject;
}
