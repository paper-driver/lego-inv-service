import { Injectable } from "@nestjs/common";
import { LegoPartsService } from "./lego-parts.service";
import { BrickDetail, BrickQuery, LegoColor, LegoInv, LegoPart, LegoPrice, LegoSource, StoreDetail } from "src/models/lego.model";
import { Part } from "src/entities/part.legoInv.entity";
import { LegoSourceService } from "./lego-source.service";
import { LegoInvService } from "./lego-inv.service";
import { LegoPriceService } from "./lego-price.service";
import { Price } from "src/entities/price.legoInv.entity";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { summarizePartsByLegoElmId } from "src/transformers/lego.transformer";
import { Color } from "src/entities/color.legoInv.entity";
import { LegoColorService } from "./lego-color.service";

@Injectable()
export class LegoService {
    constructor(
        private readonly legoPartsService: LegoPartsService,
        private readonly legoSourceService: LegoSourceService,
        private readonly legoInvService: LegoInvService,
        private readonly legoPriceService: LegoPriceService,
        private readonly legoColorService: LegoColorService){}
    
    async findAllBricks(): Promise<BrickDetail[]> {
        const bricks: Part[] = await this.legoPartsService.findAllParts();
        const formatBricks = summarizePartsByLegoElmId(bricks);
        return await Promise.all(formatBricks.map(async brick => {
            const color: Color[] = await this.legoColorService.findColorBy({
                blColorId: brick.bricklinkColorId
            } as LegoColor);
            const brickInv: Inventory = await this.legoInvService.findInvBy({
                legoElmId: brick.legoElmId
            } as LegoInv);
            const brickPrices: Price[] = await this.legoPriceService.findPriceBy({
                legoElmId: brick.legoElmId
            } as LegoPrice);
            const brickSources: StoreDetail[] = (await Promise.all(brickPrices.map(async price => {
                const source = await this.legoSourceService.findBy({
                    id: price.sourceId
                } as LegoSource);
                return source.length > 0 ? {
                    sourceId: source[0].id,
                    sourceName: source[0].sourceName,
                    sourceUrl: source[0].sourceUrl,
                    price: price.price,
                    condition: price.condition,
                    priceDate: price.priceDate
                } : null;
            }))).flat();
            return {
                ...brick,
                bricklinkColorName: color[0].blColorName,
                rebrickableColorId: color[0].rbColorId,
                rebrickableColorName: color[0].rbColorName,
                legoColorId: color[0].legoColorId,
                legoColorName: color[0].legoColorName,
                amountOwn: brickInv ? brickInv.own : 0,
                sources: brickSources
            }
        }))
    }


    async findBrickBy(params: BrickQuery): Promise<BrickDetail[]> {
        const bricks: Part[] = await this.legoPartsService.findPartsBy({
            legoElmId: params.legoElmId,
            legoDesignId: params.legoDesignId,
            blColorId: params.bricklinkColorId,
            bricklinkId: params.bricklinkId ? [params.bricklinkId] : [],
            color: params.color
        });
        let formatBricks: BrickDetail[] = summarizePartsByLegoElmId(bricks);
        return await Promise.all(formatBricks.map(async brick => {
            const color: Color[] = await this.legoColorService.findColorBy({
                blColorId: brick.bricklinkColorId
            } as LegoColor);
            const brickInv: Inventory = await this.legoInvService.findInvBy({
                legoElmId: brick.legoElmId
            } as LegoInv);
            const brickPrices: Price[] = await this.legoPriceService.findPriceBy({
                legoElmId: brick.legoElmId,
                sourceId: params.sourceId,
                condition: params.condition,
                price: params.price
            } as LegoPrice);
            const brickSources: StoreDetail[] = (await Promise.all(brickPrices.map(async price => {
                const source = await this.legoSourceService.findBy({
                    id: price.sourceId,
                    sourceName: params.sourceName,
                    sourceUrl: params.sourceUrl
                } as LegoSource);
                return source.length > 0 ? {
                    sourceId: source[0].id,
                    sourceName: source[0].sourceName,
                    sourceUrl: source[0].sourceUrl,
                    price: price.price,
                    condition: price.condition,
                    priceDate: price.priceDate
                } : null;
            }))).flat();
            return {
                ...brick,
                bricklinkColorName: color[0].blColorName,
                rebrickableColorId: color[0].rbColorId,
                rebrickableColorName: color[0].rbColorName,
                legoColorId: color[0].legoColorId,
                legoColorName: color[0].legoColorName,
                amountOwn: brickInv ? brickInv.own : 0,
                sources: brickSources
            }
        }));
    }
}