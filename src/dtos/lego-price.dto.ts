import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { Condition } from "src/entities/price.legoInv.entity";
import { LegoPrice } from "src/models/lego.model";

export class LegoPriceDto implements LegoPrice {

    @IsNumber()
    legoElmId: number;

    @IsNumber()
    sourceId: number;

    @IsEnum(Condition)
    condition: Condition;

    @IsNumber()
    @IsOptional()
    price: number = 0;

    @IsDate()
    @IsOptional()
    priceDate: Date;

}