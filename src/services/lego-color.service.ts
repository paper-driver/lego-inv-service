import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegoColor, LegoColorRes, LegoInv, LegoInvRes } from "src/models/lego.model";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";
import { LegoSet } from "src/entities/set.legoInv.entity";
import { LegoSetPart } from "src/entities/setPart.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { Repository } from "typeorm";
import { LegoInvDto } from "src/dtos/lego-inv.dto";
import { Color } from "src/entities/color.legoInv.entity";

@Injectable()
export class LegoColorService {
    constructor(
        @InjectRepository(Color) private colorRepo: Repository<Color>
    ) {}

    findAllColors(): Promise<Color[]> {
        return this.colorRepo.find();
    }

    findColorBy(params: LegoColor): Promise<Color[]> {
        return this.colorRepo.findBy({
            ...(params.blColorId || params.blColorId == 0 ? {blColorId: params.blColorId} : {}),
            ...(params.blColorName ? {blColorName: params.blColorName} : {}),
            ...(params.rbColorId || params.rbColorId == 0 ? {rbColorId: params.rbColorId} : {}),
            ...(params.rbColorName ? {rbColorName: params.rbColorName} : {}),
            ...(params.legoColorId || params.legoColorId == 0 ? {legoColorId: params.legoColorId} : {}),
            ...(params.legoColorName ? {legoColorName: params.legoColorName} : {}),
        });
    }

    async addColor(requestBody: LegoColor): Promise<LegoColorRes> {
        let numOfRowsAffected = 0;
        const result = await this.colorRepo.upsert({
            blColorId: requestBody.blColorId,
            blColorName: requestBody.blColorName,
            rbColorId: requestBody.rbColorId,
            rbColorName: requestBody.rbColorName,
            legoColorId: requestBody.legoColorId,
            legoColorName: requestBody.legoColorName
        }, ['blColorId']);
        if(result.raw.affectedRows != 0){
            //1 means insert
            //2 means update
            //0 means no update/insert
            numOfRowsAffected ++;
        }
        return {
            ...requestBody,
            numOfRowsAffected
        }
    }

    async deleteColorById(blColorId: number) {
        let numOfRowsAffected = 0;
        const result = await this.colorRepo.delete({blColorId});
        if(result.affected == 1){
            numOfRowsAffected ++;
        }
        return {
            blColorId,
            numOfRowsAffected
        }
    }

}