import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { SuccessResponse } from "../../utils/response";
import { SentryProjectService } from "../../services/sentry/sentry-project.service";

export class SentryProjectController {
    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {}

    public async index(req: Request, res: Response) {
        try {
            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, null));
        } catch (error) {
            res.json(error);
        }
    }
}
