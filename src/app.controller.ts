import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LegoInvService } from './services/lego-inv.service';
import { Part } from './entities/part.legoInv.entity';
import { LegoPartsService } from './services/lego-parts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private legoInvService: LegoInvService, 
    private legoPartsService: LegoPartsService) {}

  @Get()
  getHello(): Promise<Part[]> {
    return this.legoPartsService.findAllParts();
  }
}
