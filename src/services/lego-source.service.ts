import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegoPart, LegoPartRes, LegoSource, LegoSourceRes } from "src/models/lego.model";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";
import { LegoSet } from "src/entities/set.legoInv.entity";
import { LegoSetPart } from "src/entities/setPart.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { InsertResult, Repository } from "typeorm";
import { Exception } from "src/dtos/exception.dto";
import { ErrorEnum } from "src/models/error.model";
import { LegoPartDto } from "src/dtos/lego-part.dto";
import { LegoSourceDto } from "src/dtos/lego-source.dto";

@Injectable()
export class LegoSourceService {
    constructor(
        @InjectRepository(Part) private partRepo: Repository<Part>,
        @InjectRepository(Source) private sourceRepo: Repository<Source>,
        @InjectRepository(Price) private priceRepo: Repository<Price>,
        @InjectRepository(Inventory) private invRepo: Repository<Inventory>,
        @InjectRepository(LegoSet) private legoSetRepo: Repository<LegoSet>,
        @InjectRepository(LegoSetPart) private legoSetPartRepo: Repository<LegoSetPart>,
    ) {}

    findAllSources(): Promise<Source[]> {
        return this.sourceRepo.find();
    }

    findBy(params: LegoSource): Promise<Source[]> {
        return this.sourceRepo.findBy({
            ...(params.id ? {id: params.id} : {}),
            ...(params.sourceName ? {sourceName: params.sourceName} : {}),
            ...(params.sourceUrl ? {sourceUrl: params.sourceUrl} : {})
        });
    }

    async addSource(requestBody: LegoSourceDto): Promise<LegoSourceRes> {
        if(!requestBody.sourceName || !requestBody.sourceUrl){
            throw new Exception(
                HttpStatus.BAD_REQUEST, 
                {errorType: ErrorEnum.BAD_REQUEST, res: "source name or url is missing", log: "source name or url is missing"})
        }
        let numOfRowsAffected = 0;
        const result = await this.sourceRepo.upsert({
            sourceName: requestBody.sourceName, 
            sourceUrl: requestBody.sourceUrl, 
            ...(!!requestBody.id ? {id: requestBody.id} : {})
        }, ['id']);
        if(result.raw.affectedRows != 0){
            //1 means insert
            //2 means update
            //0 means no update/insert
            numOfRowsAffected ++;
        }
        console.log(result);
        return {
            id: result.raw[0].id,
            sourceName: requestBody.sourceName, 
            sourceUrl: requestBody.sourceUrl, 
            numOfRowsAffected
        }
    }

    async deleteSourceBy(requestBody: LegoSourceDto, fieldName: "id" | "sourceName" | "sourceUrl"): Promise<LegoSourceRes> {
        if(!requestBody[fieldName]) {
            throw new Exception(HttpStatus.BAD_REQUEST, 
                {errorType: ErrorEnum.BAD_REQUEST, res: `source ${fieldName} is missing`, log: `source ${fieldName} is missing`})
        }
        let numOfRowsAffected = 0;
        const result = await this.sourceRepo.delete({
            [fieldName]: requestBody[fieldName]
        });
        console.log(result)
        if(result.affected == 1){
            numOfRowsAffected ++;
        }
        return {
            ...requestBody,
            numOfRowsAffected
        }
    }
}