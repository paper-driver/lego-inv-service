import { Body, Controller, Delete, Get, ParseArrayPipe, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Part } from '../entities/part.legoInv.entity';
import { LegoPartsService } from 'src/services/lego-parts.service';
import { LegoPartDto } from 'src/dtos/lego-part.dto';

@Controller("lego-inv/v1")
@UsePipes(new ValidationPipe({ transform: true }))
export class LegoPartController {
  constructor(private legoPartsService: LegoPartsService) {}

  @Get("parts")
  getAllParts(): Promise<Part[]> {
    return this.legoPartsService.findAllParts();
  }

  @Get("part")
  getParts(
    @Query("legoElmId") legoElmId: number,
    @Query("bricklinkIds", new ParseArrayPipe({ items: String, separator: ',' })) bricklinkId: string[],
    @Query("legoDesignId") legoDesignId: number,
    @Query("bricklinkColorId") blColorId: number,
    @Query("color") color: string,
    @Query("description") description?: string) {
        return this.legoPartsService.findPartsBy({
            legoElmId,
            legoDesignId,
            bricklinkId,
            blColorId,
            color,
            description
        })
  }

  @Post("parts")
  addParts(@Req() request, @Body() requestBody: LegoPartDto[]) {
    return this.legoPartsService.addParts(requestBody);
  }

  @Post("part")
  addPart(@Req() request, @Body() requestBody: LegoPartDto) {
    return this.legoPartsService.addPart(requestBody);
  }

  @Delete("part")
  deletePart(@Req() request, @Body() requestBody: LegoPartDto) {
    return this.legoPartsService.deletePart(requestBody);
  }
}
