import { ProjectEntity } from "@database/entities/project/project.entity";
import { IProject } from "@database/interfaces/project/project.interface";
import { Repository } from "typeorm";

export class ProjectRepository {
    constructor(
        private readonly projectRepository: Repository<ProjectEntity>,
    ) {}

    public async findAllWithRelations(): Promise<IProject[]> {
        return await this.projectRepository.find({
            relations: [
                "projectSentryTeams",
                "projectSentryTeams.sentryTeam",
                "projectSentryTeams.sentryTeam.sentryProjects",
                "projectMicroserviceServices",
            ]
        });
    }

    public async findByIdWithRelations(id: string): Promise<IProject> {
        return await this.projectRepository.findOneOrFail({
            where: { id },
            relations: [
                "projectSentryTeams",
                "projectSentryTeams.sentryTeam",
                "projectSentryTeams.sentryTeam.sentryProjects",
                "projectMicroserviceServices",
            ]
        });
    }
}
