import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavTrackService } from './track.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

@Controller()
export class FavTrackController {
  constructor(private readonly trackService: FavTrackService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.CREATED;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.create(id);
    if (!req && s === HttpStatus.CREATED) s = HttpStatus.UNPROCESSABLE_ENTITY;
    return sendResponse[s](req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.trackService.findAll();
    return sendResponse[HttpStatus.OK](req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.trackService.remove(id);
    if (!req && s === HttpStatus.NO_CONTENT)
      s = HttpStatus.UNPROCESSABLE_ENTITY;
    return sendResponse[s](req, res);
  }
}
