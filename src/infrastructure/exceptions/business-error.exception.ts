import { HttpStatusCode } from "axios";
import { IHttpError } from "../../utils/interfaces/error/http-error.interface";

export class BusinessErrorException extends Error implements IHttpError {
    statusCode: number;

    constructor(
        message: string,
    ) {
        super(message);
        this.name = BusinessErrorException.name;
        this.statusCode = HttpStatusCode.BadRequest;
    }
}
