import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { sendResponse } from 'src/common/utils';
import { Response } from 'express';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    return await this.favoritesService
      .findAll()
      .then((data) => sendResponse[HttpStatus.OK](res, data));
  }
}
