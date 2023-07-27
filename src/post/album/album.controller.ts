import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from 'src/common/interfaces';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: Album, @Res() res: Response) {
    const createResponse = this.albumService.create(createAlbumDto);
    return sendResponse[createResponse.status](createResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allAlbums = this.albumService.findAll();
    return sendResponse[allAlbums.status](allAlbums.body, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const albumResponse = this.albumService.findOne(id);
    return sendResponse[albumResponse.status](albumResponse.body, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: Album,
    @Res() res: Response,
  ) {
    const updateResponse = this.albumService.update(id, updateAlbumDto);
    return sendResponse[updateResponse.status](updateResponse.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.albumService.remove(id);
    return sendResponse[deleteResponse.status](deleteResponse.body, res);
  }
}
