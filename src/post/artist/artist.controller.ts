import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from 'src/common/interfaces';
import { HTTP_MESSAGES } from 'src/common/constants';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: Artist) {
    const createResponse = this.artistService.create(createArtistDto);
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
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const artistResponse = this.artistService.findOne(id);
    if ('error' in artistResponse) {
      throw new HttpException(
        HTTP_MESSAGES[artistResponse.error],
        artistResponse.error,
      );
    }
    return;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: Artist) {
    const updateResponse = this.artistService.update(id, updateArtistDto);
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
    const deleteResponse = this.artistService.remove(id);
    if ('error' in deleteResponse) {
      throw new HttpException(
        HTTP_MESSAGES[deleteResponse.error],
        deleteResponse.error,
      );
    }
    return res.status(HttpStatus.NO_CONTENT).send(deleteResponse);
  }
}
