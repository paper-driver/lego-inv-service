import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LegoPriceDto } from "src/dtos/lego-price.dto";
import { Price } from "src/entities/price.legoInv.entity";
import { LegoPrice } from "src/models/lego.model";
import { Repository } from "typeorm";

@Injectable()
export class LegoPriceService {
    constructor(@InjectRepository(Price) private priceRepo: Repository<Price>) {}

    findAllPrices(): Promise<Price[]> {
        return this.priceRepo.find();
    }

    findPriceBy(params: LegoPrice): Promise<Price[]> {
        return this.priceRepo.findBy({
            ...(params.legoElmId ? {legoElmId: params.legoElmId} : {}),
            ...(params.sourceId ? {sourceId: params.sourceId} : {}),
            ...(params.condition ? {condition: params.condition} : {}),
            ...(params.price ? {price: params.price} : {}),
            ...(params.priceDate ? {priceDate: params.priceDate} : {})
        });
    }

    async addPrice(requestBody: LegoPriceDto) {
        let numOfRowsAffected = 0;
        const result = await this.priceRepo.upsert({
            ...requestBody
        }, ['legoElmId', 'sourceId', 'condition']);
        if(result.raw.affectedRows != 0){
            //1 means insert
            //2 means update
            //0 means no update/insert
            numOfRowsAffected ++;
        }
        console.log(result);
        return {
            ...requestBody,
            numOfRowsAffected
        }
    }

    async deletePriceByIds(requestBody: LegoPriceDto) {
        let numOfRowsAffected = 0;
        const result = await this.priceRepo.delete({
            legoElmId: requestBody.legoElmId,
            sourceId: requestBody.sourceId,
            condition: requestBody.condition
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