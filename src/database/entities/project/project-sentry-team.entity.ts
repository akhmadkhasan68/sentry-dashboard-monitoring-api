import { IProjectSentryTeam } from "@database/interfaces/project/project-sentry-team.interface";
import { BaseEntity } from "../base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { IProject } from "@database/interfaces/project/project.interface";
import { ISentryTeam } from "@database/interfaces/sentry/sentry-team.interface";
import { ProjectEntity } from "./project.entity";
import { SentryTeamEntity } from "../sentry/sentry-team.entity";

@Entity({
    name: 'project_sentry_teams',
})
export class ProjectSentryTeamEntity extends BaseEntity implements IProjectSentryTeam {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    projectId: string;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryTeamId: string;

    /** Relations */
    @ManyToOne(() => ProjectEntity, (project) => project.projectSentryTeams)
    project?: IProject;

    @ManyToOne(() => SentryTeamEntity, (sentryTeam) => sentryTeam.projectSentryTeams)
    sentryTeam?: ISentryTeam;
}
