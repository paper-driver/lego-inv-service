import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrickDetail, BrickQuery, LegoColor, LegoColorRes, LegoInv, LegoInvRes, SetDetail, SetQuery } from "src/models/lego.model";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";
import { LegoSet } from "src/entities/set.legoInv.entity";
import { LegoSetPart } from "src/entities/setPart.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { Repository } from "typeorm";
import { LegoInvDto } from "src/dtos/lego-inv.dto";
import { Color } from "src/entities/color.legoInv.entity";
import { LegoService } from "./lego.service";

@Injectable()
export class LegoSetService {
    constructor(
        @InjectRepository(LegoSetPart) private partRepo: Repository<LegoSetPart>,
        @InjectRepository(LegoSet) private setRepo: Repository<LegoSet>,
        private readonly legoService: LegoService
    ) {}

    findAllSets(): Promise<LegoSet[]> {
        return this.setRepo.find();
    } 

    async findAllPartsBy(params: SetQuery): Promise<SetDetail> { 
        const set: LegoSet = await this.setRepo.findOneBy({
            ...(params.legoSetId ? {legoSetId: params.legoSetId} : {}),
            ...(params.mocId ? {mockId: params.mocId} : {}),
            ...(params.setName ? {setName: params.setName} : {}),
            ...(params.numOfCopy ? {numOfCopy: params.numOfCopy} : {}),
            ...(params.numOfCopyBuilt ? {numOfCopyBuilt: params.numOfCopyBuilt} : {})
        });
        if(set) {
            const parts: LegoSetPart[] = await this.partRepo.findBy({
                legoSetId: set.id
            })
            const formatParts = (await Promise.all(parts.map(async part => {
                const bricks: BrickDetail[] = await this.legoService.findBrickBy({legoElmId: part.legoElmId} as BrickQuery);
                //there should be one brick in list as we are using lego element id
                return bricks.map(brick => ({
                    ...brick,
                    amountNeed: part.amount
                }));
            }))).flat();
            return {
                id: set.id,
                legoSetId: set.legoSetId,
                mocId: set.mocId,
                setName: set.setName,
                numOfCopy: set.numOfCopy,
                numOfCopyBuilt: set.numOfCopyBuilt,
                parts: formatParts
            }
        }else{
            return null;
        }
    }

    async findSetByLegoElmId(legoElmId: number) {
        const sets: LegoSetPart[] = await this.partRepo.findBy({
            legoElmId
        });
        const bricks: BrickDetail[] = await this.legoService.findBrickBy({
            legoElmId
        } as BrickQuery);
        sets.map(async set => {
            const setDetail = await this.setRepo.findOneBy({
                id: set.legoSetId
            });
            if(set){
                return {
                    id: setDetail.id,
                    legoSetId: setDetail.legoSetId,
                    mocId: setDetail.mocId,
                    setName: setDetail.setName,
                    numOfCopy: setDetail.numOfCopy,
                    numOfCopyBuilt: setDetail.numOfCopyBuilt,
                    parts: bricks.map(brick => ({
                        // in theory there should be one brick in bricks list
                        ...brick,
                        amountNeed: set.amount
                    }))
                }
            }
        })
    }

}