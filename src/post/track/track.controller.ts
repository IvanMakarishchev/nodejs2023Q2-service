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

const route = 'track';
@Controller(route)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() dto: Track, @Res() res: Response) {
    if (!isTrackData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.trackService.create(dto);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.trackService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.trackService.findOne(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Track, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    if (!isTrackData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.trackService.update(id, dto);
    if (req === null) return sendResponse[HttpStatus.FORBIDDEN](res, route);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.trackService.remove(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
