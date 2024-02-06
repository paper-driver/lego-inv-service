import { IsNumber, IsOptional, IsString } from "class-validator";
import { LegoSource } from "src/models/lego.model";

export class LegoSourceDto implements LegoSource {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    sourceName: string;

    @IsString()
    @IsOptional()
    sourceUrl: string;
}