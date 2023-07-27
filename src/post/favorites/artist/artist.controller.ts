import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavArtistService } from './artist.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller()
export class FavArtistController {
  constructor(private readonly artistService: FavArtistService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.artistService.create(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allArtistFavs = this.artistService.findAll();
    return sendResponse[allArtistFavs.status](allArtistFavs.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.artistService.remove(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }
}
