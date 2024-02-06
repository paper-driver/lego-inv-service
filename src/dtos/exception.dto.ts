import { HttpException, HttpStatus } from "@nestjs/common";
import { IsEnum } from "class-validator";
import { ErrorEnum } from "src/models/error.model";
import { ExceptionDto } from "src/models/exception.model";

export class Exception extends HttpException {
    @IsEnum(ErrorEnum)
    errorType: ErrorEnum;

    constructor(exceptionType: HttpStatus, exceptionObj: ExceptionDto) {
        super({
            status: exceptionType,
            message: exceptionObj.log,
            error: exceptionObj.res || ErrorEnum.UNKNOWN
        }, exceptionType);
        this.errorType = Object.freeze(exceptionObj.errorType || ErrorEnum.UNKNOWN);
    }
}   