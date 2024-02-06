import { ErrorEnum } from "./error.model";

export interface ExceptionDto {
    errorType?: ErrorEnum,
    res?: string,
    log: string
}