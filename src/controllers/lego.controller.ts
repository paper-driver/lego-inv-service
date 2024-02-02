import { Controller, Get, Param } from '@nestjs/common';
import { LegoInvService } from '../services/legoInv.service';
import { Part } from '../entities/part.legoInv.entity';
import { Inventory } from '../entities/inventory.legoInv.entity';
import { Price } from 'src/entities/price.legoInv.entity';

@Controller("lego")
export class LegoController {
  constructor(private legoInvService: LegoInvService) {}

  @Get("parts")
  getAllParts(): Promise<Part[]> {
    return this.legoInvService.findAllParts();
  }

  @Get("inv/:id")
  getInvByLegoId(@Param("id") legoElmId: number): Promise<Inventory> {
    return this.legoInvService.findInventory(legoElmId);
  }

  @Get("price/:id")
  getPriceByLegoId(@Param("id") legoElmId: number): Promise<Price> {
    return this.legoInvService.findPrice(legoElmId);
  }
}
