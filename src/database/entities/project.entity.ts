import { Column, Entity, OneToMany } from "typeorm";
import { IProject } from "../interfaces/project.interface";
import { BaseEntity } from "./base.entity";
import { ISentryTeam } from "../interfaces/sentry/sentry-team.interface";
import { SentryTeamEntity } from "./sentry/sentry-team.entity";

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
