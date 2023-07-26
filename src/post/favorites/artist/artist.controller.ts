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
import { FavArtistService } from './artist.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isUUID } from 'class-validator';
import { Response } from 'express';
import { statusResponse } from 'src/common/utils';

@Controller()
export class FavArtistController {
  constructor(private readonly artistService: FavArtistService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.artistService.create(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.CREATED).send(addResponse);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.artistService.remove(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.NO_CONTENT).sendStatus(204);
  }
}
