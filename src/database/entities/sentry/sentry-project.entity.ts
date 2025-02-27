import { BaseEntity } from "../base.entity";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";
import { SentryTeamEntity } from "./sentry-team.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { SentryProjectTypeEnum } from "./../../../utils/enums/sentry-project-type.enum";

@Entity({
    name: "sentry_projects",
})
export class SentryProjectEntity extends BaseEntity implements ISentryProject {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    sentryTeamId: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryProjectId: string;
    
    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryProjectName: string;
    
    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryProjectSlug: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    sentryProjectPlatform: string;

    @Column({
        type: "varchar",
        nullable: false,
        default: SentryProjectTypeEnum.OTHER,
    })
    type: SentryProjectTypeEnum;

    /* Relations */
    @ManyToOne(() => SentryTeamEntity, (sentryTeam) => sentryTeam.sentryProjects)
    sentryTeam?: ISentryTeam;
}
