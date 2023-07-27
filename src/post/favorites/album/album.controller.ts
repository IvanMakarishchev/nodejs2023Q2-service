import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavAlbumService } from './album.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

@Controller()
export class FavAlbumController {
  constructor(private readonly albumService: FavAlbumService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.CREATED;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.albumService.create(id);
    if (!req && s === HttpStatus.CREATED) s = HttpStatus.UNPROCESSABLE_ENTITY;
    return sendResponse[s](req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.albumService.findAll();
    return sendResponse[HttpStatus.OK](req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.albumService.remove(id);
    if (!req && s === HttpStatus.NO_CONTENT)
      s = HttpStatus.UNPROCESSABLE_ENTITY;
    return sendResponse[s](req, res);
  }
}
