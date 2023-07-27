import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from 'src/common/interfaces';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: Track, @Res() res: Response) {
    const createResponse = this.trackService.create(createTrackDto);
    return sendResponse[createResponse.status](createResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allTracks = this.trackService.findAll();
    return sendResponse[allTracks.status](allTracks.body, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const trackResponse = this.trackService.findOne(id);
    return sendResponse[trackResponse.status](trackResponse.body, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: Track,
    @Res() res: Response,
  ) {
    const updateResponse = this.trackService.update(id, updateTrackDto);
    return sendResponse[updateResponse.status](updateResponse.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.trackService.remove(id);
    return sendResponse[deleteResponse.status](deleteResponse.body, res);
  }
}
