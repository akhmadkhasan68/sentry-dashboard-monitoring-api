import { config } from "../config/config";
import { IResponseBase, IPaginationResponse } from "./interfaces/response/response.interface";

export class ResponseFormat {
    static successResponse<T>(message: string, code: number, data?: T): IResponseBase<T> {
        return {
            code: code,
            message: message,
            data: data,
        };
    }

    static errorResponse<T>(message: string, code: number, errorStack: string): IResponseBase<T> {
        return {
            code: code,
            message: message,
            error: config.app.env === "development" ? errorStack : undefined,
        };
    }

    static paginationResponse<T>(message: string, code: number, data: IPaginationResponse<T>): IResponseBase<IPaginationResponse<T>> {
        return {
            code: code,
            message: message,
            data: data,
        };
    }
}
