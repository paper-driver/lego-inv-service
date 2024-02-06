import { Body, Controller, Delete, Get, Param, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { LegoInvService } from '../services/lego-inv.service';
import { Inventory } from '../entities/inventory.legoInv.entity';
import { LegoInvRes } from 'src/models/lego.model';
import { LegoInvDto } from 'src/dtos/lego-inv.dto';

@Controller("lego-inv/v1")
@UsePipes(new ValidationPipe({ transform: true }))
export class LegoInvController {
  constructor(private legoInvService: LegoInvService) {}

  @Get("inv")
  getInvs(): Promise<Inventory[]> {
    return this.legoInvService.findAllInvs();
  }

  @Get("inv/:id")
  getInvBy(
    @Query("legoElmId") legoElmId: number,
    @Query("own") own: number): Promise<Inventory> {
        return this.legoInvService.findInvBy({
            legoElmId,
            own
        });
  }

  @Post("inv")
  addInv(@Req() request, @Body() requestBody: LegoInvDto): Promise<LegoInvRes> {
    return this.legoInvService.addInv(requestBody);
  }

  @Delete("inv/:id")
  deleteInvById(@Param("id") legoElmid: number) {
    return this.legoInvService.deleteInvById(legoElmid);
  }

}
