import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Condition } from 'src/entities/price.legoInv.entity';
import { BrickDetail } from 'src/models/lego.model';
import { LegoService } from 'src/services/lego.service';

@Controller("lego-inv/v1/api")
@UsePipes(new ValidationPipe({ transform: true }))
export class LegoController {
  constructor(
    private legoService: LegoService) {}

  @Get("bricks")
  getAllBricks(): Promise<BrickDetail[]> {
    return this.legoService.findAllBricks();
  }

  @Get("bricks")
  getBricksBy(
    @Query("legoElmId") legoElmId: number,
    @Query("legoDesignId") legoDesignId: number,
    @Query("bricklinkId") bricklinkId: string,
    @Query("bricklinkColorId") bricklinkColorId: number,
    @Query("color") color: string,
    @Query("sourceId") sourceId: number,
    @Query("sourceName") sourceName: string,
    @Query("sourceUrl") sourceUrl: string,
    @Query("condition") condition: Condition,
    @Query("price") price: number
  ): Promise<BrickDetail[]> {
    return this.legoService.findBrickBy({
      legoElmId,
      legoDesignId,
      bricklinkId,
      bricklinkColorId,
      color,
      sourceId,
      sourceName,
      sourceUrl,
      condition,
      price
    })
  }
}
