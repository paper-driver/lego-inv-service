import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Source } from 'src/entities/source.legoInv.entity';
import { LegoSourceService } from 'src/services/lego-source.service';
import { LegoSourceDto } from 'src/dtos/lego-source.dto';
import { Exception } from 'src/dtos/exception.dto';
import { ErrorEnum } from 'src/models/error.model';

@Controller("lego-inv/v1")
@UsePipes(new ValidationPipe({ transform: true }))
export class LegoSourceController {
  constructor(private legoSourceService: LegoSourceService) {}

  @Get("sources")
  getAllSources(): Promise<Source[]> {
    return this.legoSourceService.findAllSources();
  }

  @Get("source")
  getSourceBy(
    @Query("id") id: number,
    @Query("sourceName") sourceName: string,
    @Query("sourceUrl") sourceUrl: string) {
        return this.legoSourceService.findBy({
            id,
            sourceName,
            sourceUrl
        })
  }

  @Post("source")
  addSource(@Req() request, @Body() requestBody: LegoSourceDto) {
    return this.legoSourceService.addSource(requestBody);
  }

  @Delete("source/:fieldName")
  deleteSourceById(@Param("fieldName") fieldName: "id" | "sourceName" | "sourceUrl", @Req() request, @Body() requestBody: LegoSourceDto) {
    return this.legoSourceService.deleteSourceBy(requestBody, fieldName);
  }

}
