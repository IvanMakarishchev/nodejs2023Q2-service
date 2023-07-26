import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from 'src/common/interfaces';
import { HTTP_MESSAGES } from 'src/common/constants';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: Album) {
    const createResponse = this.albumService.create(createAlbumDto);
    if ('error' in createResponse) {
      throw new HttpException(
        HTTP_MESSAGES[createResponse.error],
        createResponse.error,
      );
    }
    return createResponse;
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const albumResponse = this.albumService.findOne(id);
    if ('error' in albumResponse) {
      throw new HttpException(
        HTTP_MESSAGES[albumResponse.error],
        albumResponse.error,
      );
    }
    return;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: Album) {
    const updateResponse = this.albumService.update(id, updateAlbumDto);
    if ('error' in updateResponse) {
      throw new HttpException(
        HTTP_MESSAGES[updateResponse.error],
        updateResponse.error,
      );
    }
    return updateResponse;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.albumService.remove(id);
    if ('error' in deleteResponse) {
      throw new HttpException(
        HTTP_MESSAGES[deleteResponse.error],
        deleteResponse.error,
      );
    }
    return res.status(HttpStatus.NO_CONTENT).send(deleteResponse);
  }
}
