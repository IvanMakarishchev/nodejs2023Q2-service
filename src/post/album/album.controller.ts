import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from 'src/common/interfaces';
import { Response } from 'express';
import { isAlbumData, sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

const route = 'album';

@Controller(route)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() dto: Album, @Res() res: Response) {
    if (!isAlbumData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.albumService.create(dto);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.albumService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.albumService.findOne(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Album, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    if (!isAlbumData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.albumService.update(id, dto);
    if (req === null) return sendResponse[HttpStatus.FORBIDDEN](res, route);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.albumService.remove(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
