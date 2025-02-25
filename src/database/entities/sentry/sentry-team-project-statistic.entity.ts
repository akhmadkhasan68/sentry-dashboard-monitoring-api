import { Column, Entity } from "typeorm";
import { ISentryTeamProjectStatistic } from "../../interfaces/sentry/sentry-team-project-statistic.interface";
import { BaseEntity } from "../base.entity";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";

@Entity({
    name: 'sentry_team_project_statistics',
})
export class SentryTeamProjectStatistic extends BaseEntity implements ISentryTeamProjectStatistic {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryProjectId: string;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryTeamId: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    totalIssueResolved: number;

    /** Relations */
    sentryProject?: ISentryProject;
    sentryTeam?: ISentryTeam;
}
