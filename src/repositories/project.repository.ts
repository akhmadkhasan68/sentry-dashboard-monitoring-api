import { ProjectEntity } from "../database/entities/project.entity";
import { Repository } from "typeorm";

export class ProjectRepository {
    constructor(
        private readonly projectRepository: Repository<ProjectEntity>,
    ) {}
}
