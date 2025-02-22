import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { IProject } from "../../interfaces/project.interface";
import { SentryTeamEntity } from "../sentry/sentry-team.entity";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";

@Entity({
    name: "projects",
})
export class ProjectEntity extends BaseEntity implements IProject {
    @Column({
        type: "varchar",
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: "text",
        nullable: true,
    })
    description?: string;

    /* Relations */
    @OneToMany(() => SentryTeamEntity, (sentryTeam) => sentryTeam.project)
    sentryTeams?: ISentryTeam[];
}
