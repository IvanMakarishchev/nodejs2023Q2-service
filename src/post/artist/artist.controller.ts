import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from 'src/common/interfaces';
import { Response } from 'express';
import { isArtistData, sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

const route = 'artist';

@Controller(route)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() dto: Artist, @Res() res: Response) {
    if (!isArtistData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.artistService.create(dto);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.artistService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.artistService.findOne(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Artist, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    if (!isArtistData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.artistService.update(id, dto);
    if (req === null) return sendResponse[HttpStatus.FORBIDDEN](res, route);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.artistService.remove(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
