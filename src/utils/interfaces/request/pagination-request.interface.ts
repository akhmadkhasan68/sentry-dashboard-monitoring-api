import { PaginateOrderEnum } from "../../enums/paginate-order.enum";

export interface IPaginationRequest<TFilters> {
    page: number;
    perPage: number;
    search?: string;
    sort?: string;
    order?: PaginateOrderEnum;
    filters?: TFilters;
}
