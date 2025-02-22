import { BaseEntity } from "../base.entity";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { IProject } from "../../interfaces/project.interface";
import { SentryProjectEntity } from "./sentry-project.entity";
import { ProjectEntity } from "../project/project.entity";

@Entity({
    name: "sentry_teams",
})
export class SentryTeamEntity extends BaseEntity implements ISentryTeam {
    @Column({
        type: "uuid",
        nullable: true,
    })
    projectId: string;
    
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
    @ManyToOne(() => ProjectEntity, (project) => project.sentryTeams)
    project?: IProject;

    @OneToMany(() => SentryProjectEntity, (sentryProject) => sentryProject.sentryTeam)
    sentryProjects?: ISentryProject[];
}
