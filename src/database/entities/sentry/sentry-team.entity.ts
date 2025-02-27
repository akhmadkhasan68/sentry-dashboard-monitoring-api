import { BaseEntity } from "../base.entity";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { SentryProjectEntity } from "./sentry-project.entity";
import { ProjectSentryTeamEntity } from "../project/project-sentry-team.entity";
import { IProjectSentryTeam } from "@database/interfaces/project/project-sentry-team.interface";

@Entity({
    name: "sentry_teams",
})
export class SentryTeamEntity extends BaseEntity implements ISentryTeam {

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryTeamId: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryTeamSlug: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryTeamName: string;

    @Column({
        type: "int",
        nullable: false,
        default: 0,
    })
    sentryMemberCount: number;

    /* Relations */
    @OneToMany(() => SentryProjectEntity, (sentryProject) => sentryProject.sentryTeam)
    sentryProjects?: ISentryProject[];

    @OneToMany(() => ProjectSentryTeamEntity, (sentryTeam) => sentryTeam.sentryTeam)
    projectSentryTeams?: IProjectSentryTeam[];
}
