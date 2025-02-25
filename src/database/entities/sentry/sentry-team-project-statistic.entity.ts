import { Column, Entity } from "typeorm";
import { ISentryTeamProjectStatistic } from "../../interfaces/sentry/sentry-team-project-statistic.interface";
import { BaseEntity } from "../base.entity";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";

@Entity({
    name: 'sentry_team_project_statistics',
})
export class SentryTeamProjectStatisticEntity extends BaseEntity implements ISentryTeamProjectStatistic {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryProjectId: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    totalIssueResolved: number;

    /** Relations */
    sentryProject?: ISentryProject;
}
