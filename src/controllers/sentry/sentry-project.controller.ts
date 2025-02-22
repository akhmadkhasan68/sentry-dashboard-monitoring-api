import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { SentryProjectService } from "../../services/sentry/sentry-project.service";
import { ResponseFormat } from "../../utils/response";
import { ISentryProject } from "../../database/interfaces/sentry/sentry-project.interface";

export class SentryProjectController {
    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {}

    public async index(req: Request, res: Response) {
        try {
            const data = await this.sentryProjectService.index(req);

            res.status(HttpStatusCode.Ok).json(
                ResponseFormat.paginationResponse<ISentryProject>("OK", HttpStatusCode.Ok, data)
            );
        } catch (error) {
            res.json(error);
        }
    }
}
