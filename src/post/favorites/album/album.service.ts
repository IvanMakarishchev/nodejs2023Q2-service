import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';

@Injectable()
export class FavAlbumService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    const isExists = this.dataService.getAllAlbums().find((el) => el.id === id);
    if (!isExists) return false;
    this.dataService.addAlbumToFav(id);
    return id;
  }

  findAll() {
    return this.dataService.getAllAlbumFavs();
  }

  remove(id: string) {
    if (!this.findAll().includes(id)) return false;
    this.dataService.deleteAlbumFav(id);
    return id;
  }
}
