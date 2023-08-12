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
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { isUUID } from 'class-validator';

const route = 'track';
@Controller(route)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() dto: CreateTrackDto, @Res() res: Response) {
    return await this.trackService.create(dto).then((data) => {
      return sendResponse[HttpStatus.CREATED](res, data);
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return await this.trackService
      .findAll()
      .then((data) => sendResponse[HttpStatus.OK](res, data));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.trackService
      .findOne(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.OK](res, data),
      );
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    if (
      (dto.albumId !== null && !isUUID(dto.albumId)) ||
      (dto.artistId !== null && !isUUID(dto.artistId))
    )
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    return await this.trackService.update(id, dto).then((data) => {
      return !data
        ? sendResponse[HttpStatus.NOT_FOUND](res, route)
        : sendResponse[HttpStatus.OK](res, data);
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.trackService
      .remove(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.NO_CONTENT](res, data),
      );
  }
}
