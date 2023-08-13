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
import { FavAlbumService } from './album.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
@Controller()
export class FavAlbumController {
  constructor(private readonly albumService: FavAlbumService) {}

  @Get()
  async findAllAlbumsFavs(@Res() res: Response) {
    const req = await this.albumService.findAllAlbumsFavs();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Post(':id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.albumService
      .addAlbum(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'album')
          : sendResponse[HttpStatus.CREATED](res, data),
      );
  }

  @Delete(':id')
  async removeAlbumFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const req = await this.albumService.removeAlbumFromFavs(id);
    return !req
      ? sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, 'album')
      : sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
