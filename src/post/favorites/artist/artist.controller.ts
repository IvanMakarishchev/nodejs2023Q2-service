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
import { FavArtistService } from './artist.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

const target = 'artist';

@Controller()
export class FavArtistController {
  constructor(private readonly artistService: FavArtistService) {}

  @Get()
  async findAllArtistsFavs(@Res() res: Response) {
    const req = await this.artistService.findAllArtistsFavs();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Post(':id')
  async addArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    return await this.artistService.addArtist(id).then((data) => {
      return !data
        ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'artist')
        : sendResponse[HttpStatus.CREATED](res, data);
    });
  }

  @Delete(':id')
  async removeArtistFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const req = await this.artistService.removeArtistFromFavs(id);
    return !req
      ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'artist')
      : sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
