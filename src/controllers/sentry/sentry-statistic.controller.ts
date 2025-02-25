import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { SentryProjectService } from "../../services/sentry/sentry-project.service";
import { ResponseFormat } from "../../utils/response";

export class SentryStatisticController {
    constructor(
        private readonly sentryProjectService: SentryProjectService,
    ) {}

    public async getProjectUnresolvedIssues(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.sentryProjectService.getProjectUnresolvedIssues();

            res.status(HttpStatusCode.Ok).json(ResponseFormat.successResponse<any>("OK", HttpStatusCode.Ok, data));
        } catch (error) {
            next(error);
        }
    }
}
