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
import { ArtistService } from './artist.service';
import { Artist } from 'src/common/interfaces';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: Artist, @Res() res: Response) {
    const createResponse = this.artistService.create(createArtistDto);
    return sendResponse[createResponse.status](createResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allArtists = this.artistService.findAll();
    return sendResponse[allArtists.status](allArtists.body, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const artistResponse = this.artistService.findOne(id);
    return sendResponse[artistResponse.status](artistResponse.body, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: Artist,
    @Res() res: Response,
  ) {
    const updateResponse = this.artistService.update(id, updateArtistDto);
    return sendResponse[updateResponse.status](updateResponse.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.artistService.remove(id);
    return sendResponse[deleteResponse.status](deleteResponse.body, res);
  }
}
