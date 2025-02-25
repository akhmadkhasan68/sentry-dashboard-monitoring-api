import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { ResponseFormat } from "../../utils/response";
import { DataNotFoundException } from "../exceptions/data-not-found.exception";
import { BusinessErrorException } from "../exceptions/business-error.exception";

export const errorHandlerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = HttpStatusCode.InternalServerError;
    let message = "Internal Server Error";

    if (error instanceof DataNotFoundException) {
        statusCode = (error as DataNotFoundException).statusCode;
        message = error.message;
    } else if (error instanceof BusinessErrorException) {
        statusCode = (error as BusinessErrorException).statusCode;
        message = error.message;
    }

    
    return res.status(statusCode).json(
        ResponseFormat.errorResponse<null>(message, statusCode, error.stack as string)
    );
}
