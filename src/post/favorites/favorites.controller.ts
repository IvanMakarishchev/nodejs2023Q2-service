import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { sendResponse } from 'src/common/utils';
import { Response } from 'express';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Res() res: Response) {
    const req = this.favoritesService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }
}
