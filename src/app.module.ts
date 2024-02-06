import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configEnvvariables, loadDBConfig } from './config/config';
import { LegoInvService } from './services/lego-inv.service';
import { Inventory } from './entities/inventory.legoInv.entity';
import { Part } from './entities/part.legoInv.entity';
import { Source } from './entities/source.legoInv.entity';
import { Price } from './entities/price.legoInv.entity';
import { LegoController } from './controllers/lego.controller';
import { LegoSet } from './entities/set.legoInv.entity';
import { LegoSetPart } from './entities/setPart.legoInv.entity';
import { LegoPartsService } from './services/lego-parts.service';
import { APP_FILTER } from '@nestjs/core';
import { SharedExceptionFilter } from './filters/shared-exception-filter';
import { LegoSourceService } from './services/lego-source.service';
import { LegoPartController } from './controllers/lego-part.controller';
import { LegoInvController } from './controllers/lego-inv.controller';
import { LegoSourceController } from './controllers/lego-source.controller';
import { LegoPriceController } from './controllers/lego-price.controller';
import { LegoPriceService } from './services/lego-price.service';
import { LegoService } from './services/lego.service';
import { Color } from './entities/color.legoInv.entity';
import { LegoSetService } from './services/lego-set.service';
import { LegoColorService } from './services/lego-color.service';

configEnvvariables();
@Module({
  imports: [
    TypeOrmModule.forRoot(loadDBConfig("legoInv")),
    TypeOrmModule.forFeature([Inventory, Part, Source, Price, LegoSet, LegoSetPart, Color]),
    ConfigModule
  ],
  controllers: [
    AppController, 
    LegoController,
    LegoPartController,
    LegoInvController,
    LegoSourceController,
    LegoPriceController
  ],
  providers: [
    Logger,
    AppService, 
    LegoInvService, 
    LegoPartsService,
    LegoSourceService,
    LegoPriceService,
    LegoSetService,
    LegoService,
    LegoColorService,
    {
      provide: APP_FILTER,
      useClass: SharedExceptionFilter
    }
  ]
})
export class AppModule {}
