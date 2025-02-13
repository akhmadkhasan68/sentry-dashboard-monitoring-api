import { Request, Response } from "express";
import { SuccessResponse } from "../utils/response";
import { HttpStatusCode } from "axios";

export class DirectMessageController {
    constructor() {}

    public async listDirectMessage(_: Request, res: Response) {
        try {
            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, null));
        } catch (error) {
            res.json(error);
        }
    }

    public async getDetailDirectMessage(req: Request, res: Response) {
        try {
            const { id } = req.params

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get detail data direct messages', HttpStatusCode.Ok, null));
        } catch (error) {
            res.json(error);
        }
    }

    public async sendDirectMessage(req: Request, res: Response) {
        try {
            const { recepient_id, text } = req.body;

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success send direct messages', HttpStatusCode.Ok, null));
        } catch (error) {
            res.json(error);
        }
    }
}
