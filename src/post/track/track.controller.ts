import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/common/interfaces';
import { Response } from 'express';
import { HTTP_MESSAGES } from 'src/common/constants';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: Track) {
    const createResponse = this.trackService.create(createTrackDto);
    if ('error' in createResponse) {
      throw new HttpException(
        HTTP_MESSAGES[createResponse.error],
        createResponse.error,
      );
    }
    return createResponse;
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const trackResponse = this.trackService.findOne(id);
    if ('error' in trackResponse) {
      throw new HttpException(
        HTTP_MESSAGES[trackResponse.error],
        trackResponse.error,
      );
    }
    return;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: Track) {
    const updateResponse = this.trackService.update(id, updateTrackDto);
    if ('error' in updateResponse) {
      throw new HttpException(
        HTTP_MESSAGES[updateResponse.error],
        updateResponse.error,
      );
    }
    return updateResponse;
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.trackService.remove(id);
    if ('error' in deleteResponse) {
      throw new HttpException(
        HTTP_MESSAGES[deleteResponse.error],
        deleteResponse.error,
      );
    }
    return res.status(HttpStatus.NO_CONTENT).send(deleteResponse);
  }
}
