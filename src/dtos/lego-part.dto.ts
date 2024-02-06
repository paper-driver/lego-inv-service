import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { LegoPart } from "src/models/lego.model";

export class LegoPartDto implements LegoPart {

    @IsNumber()
    legoElmId: number;

    @IsNumber()
    @IsOptional()
    legoDesignId: number;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    bricklinkId: string[];

    @IsNumber()
    blColorId: number;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    descritpion?: string;
}