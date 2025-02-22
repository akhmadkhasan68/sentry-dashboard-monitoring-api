import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { SentryProjectService } from "../../services/sentry/sentry-project.service";
import { ResponseHelper } from "../../utils/response";

export class SentryProjectController {
    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {}

    public async index(req: Request, res: Response) {
        try {
            res.status(HttpStatusCode.Ok).json(
                ResponseHelper.successResponse('OK', HttpStatusCode.Ok)
            );
        } catch (error) {
            res.json(error);
        }
    }
}
