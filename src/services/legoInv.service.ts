import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrickPrice } from "src/dtos/lego-dto";
import { Inventory } from "src/entities/inventory.legoInv.entity";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";
import { Source } from "src/entities/source.legoInv.entity";
import { Repository } from "typeorm";

@Injectable()
export class LegoInvService {
    constructor(
        @InjectRepository(Part) private partRepo: Repository<Part>,
        @InjectRepository(Source) private sourceRepo: Repository<Source>,
        @InjectRepository(Price) private priceRepo: Repository<Price>,
        @InjectRepository(Inventory) private invRepo: Repository<Inventory>,
    ) {}

    findAllParts(): Promise<Part[]> {
        return this.partRepo.find();
    }

    findParts(legoElmId: number): Promise<Part[]> {
        return this.partRepo.findBy({ legoElmId });
    }

    findAllSources(): Promise<Source[]> {
        return this.sourceRepo.find();
    }

    findInventory(legoElmId: number): Promise<Inventory> {
        return this.invRepo.findOneBy({ legoElmId });
    }

    findPrice(legoElmId: number): Promise<Price> {
        return this.priceRepo.findOneBy({ legoElmId });
    }

}