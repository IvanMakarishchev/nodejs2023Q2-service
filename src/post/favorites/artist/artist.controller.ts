import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavArtistService } from './artist.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { isUUID } from 'class-validator';

const target = 'artist';

@Controller()
export class FavArtistController {
  constructor(private readonly artistService: FavArtistService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, target);
    const req = this.artistService.create(id);
    if (!req) return sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, target);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.artistService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, target);
    const req = this.artistService.remove(id);
    if (!req) return sendResponse[HttpStatus.UNPROCESSABLE_ENTITY](res, target);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
