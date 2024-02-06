import { IsNumber } from "class-validator";
import { LegoInv } from "src/models/lego.model";

export class LegoInvDto implements LegoInv {
    @IsNumber()
    legoElmId: number;

    @IsNumber()
    own: number;
}