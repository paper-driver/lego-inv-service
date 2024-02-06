import { IsEnum, IsString } from "class-validator";
import { ErrorEnum } from "src/models/error.model";

export class ErrorResponseDto {
    @IsEnum(ErrorEnum)
    reasonCode: ErrorEnum;

    @IsString()
    reasonText: string;

    constructor(reasonCode: ErrorEnum, reasonText: string) {
        this.reasonCode = reasonCode;
        this.reasonText = reasonText;
    }
}