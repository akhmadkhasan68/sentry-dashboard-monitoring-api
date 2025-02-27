import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { IProject } from "../../interfaces/project/project.interface";
import { IProjectMicroserviceService } from "@database/interfaces/project/project-microservice-service.interface";
import { ProjectMicroserviceServiceEntity } from "./project-microservice-service.entity";
import { IProjectSentryTeam } from "@database/interfaces/project/project-sentry-team.interface";
import { ProjectSentryTeamEntity } from "./project-sentry-team.entity";

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

    @Column({
        type: "boolean",
        default: true,
    })
    isActive: boolean;

    @Column({
        type: "boolean",
        default: false,
    })
    isMicroservices: boolean;

    /* Relations */
    @OneToMany(() => ProjectMicroserviceServiceEntity, (projectMicroserviceService) => projectMicroserviceService.project)
    projectMicroserviceServices?: IProjectMicroserviceService[];

    @OneToMany(() => ProjectSentryTeamEntity, (sentryTeam) => sentryTeam.project)
    projectSentryTeams?: IProjectSentryTeam[];
}
