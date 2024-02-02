import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configEnvvariables, loadDBConfig } from './config/config';
import { LegoInvService } from './services/legoInv.service';
import { Inventory } from './entities/inventory.legoInv.entity';
import { Part } from './entities/part.legoInv.entity';
import { Source } from './entities/source.legoInv.entity';
import { Price } from './entities/price.legoInv.entity';
import { LegoController } from './controllers/lego.controller';
import { LegoSet } from './entities/set.legoInv.entity';
import { LegoSetPart } from './entities/setPart.legoInv.entity';

configEnvvariables();
@Module({
  imports: [
    TypeOrmModule.forRoot(loadDBConfig("legoInv")),
    TypeOrmModule.forFeature([Inventory, Part, Source, Price, LegoSet, LegoSetPart]),
    ConfigModule
  ],
  controllers: [AppController, LegoController],
  providers: [AppService, LegoInvService]
})
export class AppModule {}
