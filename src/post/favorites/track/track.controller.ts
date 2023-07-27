import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavTrackService } from './track.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller()
export class FavTrackController {
  constructor(private readonly trackService: FavTrackService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.trackService.create(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allTrackFavs = this.trackService.findAll();
    return sendResponse[allTrackFavs.status](allTrackFavs.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const addResponse = this.trackService.remove(id);
    return sendResponse[addResponse.status](addResponse.body, res);
  }
}
