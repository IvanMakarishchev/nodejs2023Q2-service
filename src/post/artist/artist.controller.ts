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
import { ArtistService } from './artist.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

const route = 'artist';

@Controller(route)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() dto: CreateArtistDto, @Res() res: Response) {
    return await this.artistService.create(dto).then((data) => {
      return sendResponse[HttpStatus.CREATED](res, data);
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return await this.artistService
      .findAll()
      .then((data) => sendResponse[HttpStatus.OK](res, data));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.artistService
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
    @Body() dto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    return await this.artistService.update(id, dto).then((data) => {
      return !data
        ? sendResponse[HttpStatus.NOT_FOUND](res, route)
        : sendResponse[HttpStatus.OK](res, data);
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.artistService
      .remove(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.NO_CONTENT](res, data),
      );
  }
}
