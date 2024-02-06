import { IsNumber, IsOptional, IsString } from "class-validator";
import { LegoColor, LegoInv } from "src/models/lego.model";

export class LegoColorDto implements LegoColor {
    @IsNumber()
    blColorId: number;

    @IsString()
    @IsOptional()
    blColorName: string;

    @IsNumber()
    rbColorId: number;

    @IsString()
    @IsOptional()
    rbColorName: string;

    @IsNumber()
    legoColorId: number;

    @IsString()
    @IsOptional()
    legoColorName: string;
}