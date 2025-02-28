import { IProject } from "@database/interfaces/project/project.interface";
import { ProjectService } from "@services/project/project.service";
import { ResponseFormat } from "@utils/response";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";

export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.projectService.findAllWithRelations();

            res.status(HttpStatusCode.Ok).json(ResponseFormat.successResponse<IProject[]>("OK", HttpStatusCode.Ok, data));
        } catch (error) {
            next(error);
        }
    }
}
