import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';

@Injectable()
export class FavoritesService {
  constructor(private dataService: DataService) {}

  findAll() {
    return this.dataService.getAllFavs();
  }
}
