import { IHttpError } from "../../utils/interfaces/error/http-error.interface";
import { HttpStatusCode } from "axios";

export class DataNotFoundException extends Error implements IHttpError {
    statusCode: number;

    constructor(
        message: string,
    ) {
        super(message);
        this.name = DataNotFoundException.name;
        this.statusCode = HttpStatusCode.NotFound;
    }
}
