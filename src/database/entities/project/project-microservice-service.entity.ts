import { IProjectMicroserviceService } from "@database/interfaces/project/project-microservice-service.interface";
import { BaseEntity } from "../base.entity";
import { IProject } from "@database/interfaces/project/project.interface";
import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity({
    name: 'project_microservice_services',
})
export class ProjectMicroserviceServiceEntity extends BaseEntity implements IProjectMicroserviceService {
    @Column({
        type: 'uuid',
        nullable: false,
    })
    projectId: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    /* Relations */
    @ManyToOne(() => ProjectEntity, (project) => project.projectMicroserviceServices)
    project?: IProject;
}
