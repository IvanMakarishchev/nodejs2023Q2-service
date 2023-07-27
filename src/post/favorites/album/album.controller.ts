import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavAlbumService } from './album.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller()
export class FavAlbumController {
  constructor(private readonly albumService: FavAlbumService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.albumService.create(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allAlbumFavs = this.albumService.findAll();
    return sendResponse[allAlbumFavs.status](allAlbumFavs.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.albumService.remove(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }
}
