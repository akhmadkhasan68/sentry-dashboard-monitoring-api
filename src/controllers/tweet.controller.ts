import { Request, Response } from "express";
import { SuccessResponse } from "../utils/response";
import { HttpStatusCode } from "axios";

export class TweetController {
    constructor() {}

    public async postTweet(req: Request, res: Response) {
        try {
            const { status } = req.body;

            res.status(HttpStatusCode.Ok).json(SuccessResponse.setSuccessRespose('Success get data direct messages', HttpStatusCode.Ok, null));
        } catch (error) {
            res.json(error);
        }
    }
}
