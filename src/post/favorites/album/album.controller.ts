import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavAlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';
import { Response } from 'express';
import { statusResponse } from 'src/common/utils';

@Controller()
export class FavAlbumController {
  constructor(private readonly albumService: FavAlbumService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.albumService.create(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.CREATED).send(addResponse);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.albumService.remove(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.NO_CONTENT).sendStatus(204);
  }
}
