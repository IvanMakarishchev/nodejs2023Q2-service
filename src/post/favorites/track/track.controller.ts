import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavTrackService } from './track.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller()
export class FavTrackController {
  constructor(private readonly trackService: FavTrackService) {}

  @Get()
  async findAllTracksFavs(@Res() res: Response) {
    const req = await this.trackService.findAllTracksFavs();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Post(':id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.trackService
      .addTrack(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'track')
          : sendResponse[HttpStatus.CREATED](res, data),
      );
  }

  @Delete(':id')
  async removeTrackFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const req = await this.trackService.removeTrackFromFavs(id);
    return !req
      ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'track')
      : sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
