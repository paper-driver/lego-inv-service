import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LegoInvService } from './services/legoInv.service';
import { Part } from './entities/part.legoInv.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private legoInvService: LegoInvService) {}

  @Get()
  getHello(): Promise<Part[]> {
    return this.legoInvService.findAllParts();
  }
}
