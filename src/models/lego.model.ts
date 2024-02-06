import { Condition } from "src/entities/price.legoInv.entity";

export interface LegoPart {
    legoElmId: number,
    legoDesignId: number,
    bricklinkId: string[],
    blColorId: number,
    color: string,
    description?: string
}

export interface LegoPartRes {
    legoElmId: number,
    bricklinkId?: string[],
    legoDesignId?: number,
    color?: string,
    numOfRowsAffected?: number
}

export interface LegoSource {
    id: number,
    sourceName: string,
    sourceUrl: string
}

export interface LegoSourceRes {
    id: number,
    sourceName: string,
    sourceUrl: string,
    numOfRowsAffected?: number
}

export interface LegoInv {
    legoElmId: number,
    own: number
}

export interface LegoInvRes {
    legoElmId: number,
    numOfRowsAffected?: number
}

export interface LegoColor {
    blColorId: number,
    blColorName: string,
    rbColorId: number,
    rbColorName: string,
    legoColorId: number,
    legoColorName: string
}

export interface LegoColorRes {
    blColorId: number,
    numOfRowsAffected?: number
}

export interface LegoPrice {
    legoElmId: number,
    sourceId: number,
    condition: Condition,
    price: number,
    priceDate: Date
}

export interface LegoPriceRes {
    legoElmId: number,
    sourceId: number,
    condition: Condition,
    price: number,
    priceDate: Date,
    numOfRowsAffected?: number
}

export interface SetQuery {
    legoSetId: number,
    mocId: string,
    setName: string,
    numOfCopy: number,
    numOfCopyBuilt: number
}


export interface BrickQuery {
    legoElmId: number,
    legoDesignId: number,
    bricklinkId: string,
    bricklinkColorId: number,
    color: string,
    sourceId: number,
    sourceName: string,
    sourceUrl: string,
    condition: Condition,
    price: number 
}

export interface BrickDetail {
    legoElmId: number,
    legoDesignId: number,
    bricklinkIds: string[],
    description: string,
    bricklinkColorId: number,
    bricklinkColorName: string,
    rebrickableColorId: number,
    rebrickableColorName: string,
    legoColorId: number,
    legoColorName: string,
    color: string,
    amountOwn: number,
    amountNeed: number,
    sources: StoreDetail[]
}

export interface StoreDetail {
    sourceId: number,
    sourceName: string,
    sourceUrl: string,
    price: number,
    condition: Condition,
    priceDate: Date
}

export interface SetDetail {
    id: number,
    legoSetId: number,
    mocId: string,
    setName: string,
    numOfCopy: number,
    numOfCopyBuilt: number,
    parts: BrickDetail[]
}

export interface BrickInventory {
    legoElmId: number,
    legoDesignId: number,
    brickLinkId: string,
    color: string,
    amountOwn: number,
    amountUsed: number
}