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

const target = 'album';
@Controller()
export class FavAlbumController {
  constructor(private readonly albumService: FavAlbumService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, target);
    const req = this.albumService.create(id);
    if (!req) return sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, target);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.albumService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, target);
    const req = this.albumService.remove(id);
    if (!req) return sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, target);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
