import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegoInv, LegoInvRes } from "src/models/lego.model";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";
import { LegoSet } from "src/entities/set.legoInv.entity";
import { LegoSetPart } from "src/entities/setPart.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { Repository } from "typeorm";
import { LegoInvDto } from "src/dtos/lego-inv.dto";

@Injectable()
export class LegoInvService {
    constructor(
        @InjectRepository(Part) private partRepo: Repository<Part>,
        @InjectRepository(Source) private sourceRepo: Repository<Source>,
        @InjectRepository(Price) private priceRepo: Repository<Price>,
        @InjectRepository(Inventory) private invRepo: Repository<Inventory>,
        @InjectRepository(LegoSet) private legoSetRepo: Repository<LegoSet>,
        @InjectRepository(LegoSetPart) private legoSetPartRepo: Repository<LegoSetPart>,
    ) {}

    findAllInvs(): Promise<Inventory[]> {
        return this.invRepo.find();
    }

    findInvBy(params: LegoInv): Promise<Inventory> {
        return this.invRepo.findOneBy({
            ...(params.legoElmId ? {legoElmId: params.legoElmId} : {}),
            ...(params.own ? {own: params.own} : {})
        });
    }

    async addInv(requestBody: LegoInvDto): Promise<LegoInvRes> {
        let numOfRowsAffected = 0;
        const result = await this.invRepo.upsert({
            legoElmId: requestBody.legoElmId,
            own: requestBody.own
        }, ['legoElmId']);
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

    async deleteInvById(legoElmId: number) {
        let numOfRowsAffected = 0;
        const result = await this.invRepo.delete({legoElmId});
        if(result.affected == 1){
            numOfRowsAffected ++;
        }
        return {
            legoElmId,
            numOfRowsAffected
        }
    }

}