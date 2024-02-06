import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger, LoggerService } from "@nestjs/common";
import { Exception } from "../dtos/exception.dto";
import { ErrorEnum } from "src/models/error.model";
import { Response } from "express";
import { ErrorResponseDto } from "src/dtos/error-response.dto";
import { QueryFailedError } from "typeorm";

@Catch()
export class SharedExceptionFilter implements ExceptionFilter {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}

    catch(exception: Error | Exception | QueryFailedError, host: ArgumentsHost): void {
        this.logger.error( `[${exception['errorType'] || ErrorEnum.UNKNOWN}] ${exception.message}`, exception.stack);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        response.status(status).json(new ErrorResponseDto(
            exception['errorType'] || ErrorEnum.UNKNOWN,
            this.extractReasonText(exception)
        ));
    }

    extractReasonText(exception: Error | Exception): string {
        if(exception instanceof Exception) {
            const msg = exception.getResponse() as any;
            return msg.error;
        }else{
            return exception.message;
        }
    }
}