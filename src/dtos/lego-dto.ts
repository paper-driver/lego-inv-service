import { Condition } from "src/entities/price.legoInv.entity";

export interface BrickPrice {
    legoElmId: number,
    legoDesignId: number,
    brickLinkId: string[],
    color: string,
    storeName: string,
    storeUrl: string,
    condition: Condition
}

export interface BrickInventory {
    legoElmId: number,
    legoDesignId: number,
    brickLinkId: string,
    color: string,
    amountOwn: number,
    amountUsed: number
}