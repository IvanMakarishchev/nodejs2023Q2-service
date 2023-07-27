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
import { TrackService } from './track.service';
import { Track } from 'src/common/interfaces';
import { Response } from 'express';
import { isTrackData, sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() dto: Track, @Res() res: Response) {
    let s = HttpStatus.CREATED;
    if (!isTrackData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.create(dto);
    return sendResponse[s](req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.trackService.findAll();
    return sendResponse[HttpStatus.OK](req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.findOne(id);
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Track, @Res() res: Response) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isTrackData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.update(id, dto);
    if (req === null && s === HttpStatus.OK) s = HttpStatus.FORBIDDEN;
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.remove(id);
    if (!req && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }
}
