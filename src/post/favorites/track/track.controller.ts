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
import { FavTrackService } from './track.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from 'src/common/interfaces';
import { Response } from 'express';
import { isUUID } from 'class-validator';
import { statusResponse } from 'src/common/utils';

@Controller()
export class FavTrackController {
  constructor(private readonly trackService: FavTrackService) {}

  @Post(':id')
  create(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.trackService.create(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.CREATED).send(addResponse);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return res.status(HttpStatus.BAD_REQUEST).sendStatus(400);
    const addResponse = this.trackService.remove(id);
    if (!addResponse)
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).sendStatus(422);
    return res.status(HttpStatus.NO_CONTENT).sendStatus(204);
  }
}
