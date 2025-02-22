export interface IResponseBase<T> {
    code: number;
    message: string;
    data?: T;
}
export interface IResponsePaginationMetaData {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

export interface IResponsePagination<T> {
    items: T[];
    meta: IResponsePaginationMetaData;
}

export class ResponseHelper {
    static successResponse<T>(message: string, code: number, data?: T): IResponseBase<T> {
        return {
            code: code,
            message: message,
            data: data,
        };
    }

    static errorResponse<T>(message: string, code: number): IResponseBase<T> {
        return {
            code: code,
            message: message,
        };
    }

    static paginationResponse<T>(message: string, code: number, data: IResponsePagination<T>): IResponseBase<IResponsePagination<T>> {
        return {
            code: code,
            message: message,
            data: data,
        };
    }
}
