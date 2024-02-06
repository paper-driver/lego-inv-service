import { BrickDetail, LegoPart } from "src/models/lego.model";
import { Part } from "src/entities/part.legoInv.entity";
import { Price } from "src/entities/price.legoInv.entity";

export function prepareFindPartQuery(params: LegoPart): any[] {
    if(!params.bricklinkId || params.bricklinkId == undefined || params.bricklinkId.length == 0){
        return [{
            ...(params.legoElmId || params.legoElmId == 0 ? {legoElmId: params.legoElmId} : {}),
            ...(params.legoDesignId || params.legoDesignId == 0 ? {legoDesignId: params.legoDesignId} : {}),
            ...(params.blColorId || params.blColorId == 0 ? {blColorId: params.blColorId} : {}),
            ...(params.color ? {color: params.color} : {}),
            ...(params.description ? {descr : params.description} : {})
        }]
    } else {
        return params.bricklinkId.map(bricklinkId => ({
            ...(params.legoElmId || params.legoElmId == 0 ? {legoElmId: params.legoElmId} : {}),
            ...(params.legoDesignId || params.legoDesignId == 0 ? {legoDesignId: params.legoDesignId} : {}),
            bricklinkId,
            ...(params.blColorId || params.blColorId == 0 ? {blColorId: params.blColorId} : {}),
            ...(params.color ? {color: params.color} : {}),
            ...(params.description ? {descr : params.description} : {})
        }))
    }
}

export function summarizePartsByLegoElmId(bricks: Part[]): BrickDetail[] {
    let filteredBricks = bricks.reduce((acc, cur) => {
        (acc[cur.legoElmId] = acc[cur.legoElmId] || []).push(cur);
        return acc;
    }, {});
    return Object.keys(filteredBricks).map(key => {
        const bricklinkIds = filteredBricks[key].flatMap(({bricklinkId}) => bricklinkId);
        //filteredBricks has object key means it has content in its array
        let basicBrickInfo = filteredBricks[key][0];
        return {
            legoElmId: basicBrickInfo.legoElmId,
            legoDesignId: basicBrickInfo.legoDesignId,
            bricklinkIds,
            bricklinkColorId: basicBrickInfo.blColorId,
            description: basicBrickInfo.descr,
            color: basicBrickInfo.color
        } as BrickDetail;
    });
}