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

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() dto: Artist, @Res() res: Response) {
    let s = HttpStatus.CREATED;
    if (!isArtistData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.artistService.create(dto);
    return sendResponse[s](req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.artistService.findAll();
    return sendResponse[HttpStatus.OK](req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.artistService.findOne(id);
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Artist, @Res() res: Response) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isArtistData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.artistService.update(id, dto);
    if (req === null && s === HttpStatus.OK) s = HttpStatus.FORBIDDEN;
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.artistService.remove(id);
    if (!req && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }
}
