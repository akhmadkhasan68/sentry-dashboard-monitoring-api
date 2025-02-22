export interface IResponseBase<T> {
    code: number;
    message: string;
    data?: T;
}
export interface IPaginationResponseMetaData {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}

export interface IPaginationResponse<T> {
    items: T[];
    meta: IPaginationResponseMetaData;
}
