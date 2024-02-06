import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegoPart, LegoPartRes } from "src/models/lego.model";
import { Part } from "src/entities/part.legoInv.entity";
import { Repository } from "typeorm";
import { LegoPartDto } from "src/dtos/lego-part.dto";
import { prepareFindPartQuery } from "src/transformers/lego.transformer";

@Injectable()
export class LegoPartsService {
    constructor(
        @InjectRepository(Part) private partRepo: Repository<Part>,
    ) {}

    findAllParts(): Promise<Part[]> {
        return this.partRepo.find();
    }

    async findPartsBy(params: LegoPart): Promise<Part[]> {
        const queries = prepareFindPartQuery(params);
        const searchResult = await Promise.all(queries.map(query => this.partRepo.findBy(query)));
        return searchResult.flat();
    }

    async addPart(requestBody: LegoPartDto): Promise<LegoPartRes> {
        let numOfRowsAffected = 0;
        const upsertLst = requestBody.bricklinkId.map(async (id: string) => {
            const result = await this.partRepo.upsert({
                legoDesignId: requestBody.legoDesignId, 
                color: requestBody.color, 
                descr: requestBody.descritpion,
                legoElmId: requestBody.legoElmId,
                bricklinkId: id
            }, ['legoElmId', 'bricklinkId']);
            if(result.raw.affectedRows != 0){
                //1 means insert
                //2 means update
                //0 means no update/insert
                numOfRowsAffected ++;
            }
            console.log(result)
        })
        await Promise.all(upsertLst);
        return {
            legoElmId: requestBody.legoElmId,
            numOfRowsAffected
        }
    }

    async addParts(requestBody: LegoPartDto[]): Promise<LegoPartRes[]> {
        const upsertLst = requestBody.map(item => this.addPart(item));
        return Promise.all(upsertLst);
    }

    async deletePart(requestBody: LegoPartDto): Promise<LegoPartRes> {
        let numOfRowsAffected = 0;
        const deleteLst = requestBody.bricklinkId.map(async (id: string) => {
            const result = await this.partRepo.delete({
                legoElmId: requestBody.legoElmId,
                bricklinkId: id
            });
            if(result.affected == 1){
                numOfRowsAffected ++;
            }
        })
        await Promise.all(deleteLst);
        return {
            legoElmId: requestBody.legoElmId,
            numOfRowsAffected
        }
    }
}