import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from 'src/common/interfaces';
import { Response } from 'express';
import { HTTP_MESSAGES } from 'src/common/constants';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: Track) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: Track) {
    return this.trackService.update(id, updateTrackDto);
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
