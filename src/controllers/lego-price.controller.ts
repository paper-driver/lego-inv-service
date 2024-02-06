import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Condition, Price } from 'src/entities/price.legoInv.entity';
import { LegoPrice } from 'src/models/lego.model';
import { Exception } from 'src/dtos/exception.dto';
import { ErrorEnum } from 'src/models/error.model';
import { LegoPriceService } from 'src/services/lego-price.service';
import { LegoPriceDto } from 'src/dtos/lego-price.dto';

@Controller("lego-inv/v1")
@UsePipes(new ValidationPipe({ transform: true }))
export class LegoPriceController {
  constructor(
    private legoPriceService: LegoPriceService) {}

  @Get("prices")
  getAllPrices(): Promise<Price[]> {
    return this.legoPriceService.findAllPrices();
  }

  @Get("price/:fieldName")
  getPrice(
    @Query("logoElmId") legoElmId: number,
    @Query("sourceId") sourceId: number,
    @Query("condition") condition: Condition,
    @Query("price") price: number,
    @Query("priceDate") priceDate: Date): Promise<Price[]> {
        return this.legoPriceService.findPriceBy({
            legoElmId,
            sourceId,
            condition,
            price,
            priceDate
        });
  }

  @Delete("price")
  addParts(@Req() request, @Body() requestBody: LegoPriceDto) {
    return this.legoPriceService.deletePriceByIds(requestBody);
  }

}
