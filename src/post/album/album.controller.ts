import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  HttpStatus,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

const route = 'album';

@Controller(route)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreateAlbumDto, @Res() res: Response) {
    // if (!isAlbumData(dto))
    //   return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    return await this.albumService
      .create(dto)
      .then((data) => sendResponse[HttpStatus.CREATED](res, data));
  }

  @Get()
  async findAll(@Res() res: Response) {
    return await this.albumService
      .findAll()
      .then((data) => sendResponse[HttpStatus.OK](res, data));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.albumService
      .findOne(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.OK](res, data),
      );
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    // if (!isAlbumData(dto)) return sendResponse[HttpStatus.BAD_REQUEST](res);
    return await this.albumService
      .update(id, dto)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.OK](res, data),
      );
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.albumService
      .remove(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.NO_CONTENT](res, data),
      );
  }
}
