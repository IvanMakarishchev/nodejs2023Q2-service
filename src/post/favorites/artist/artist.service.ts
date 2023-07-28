import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';

@Injectable()
export class FavArtistService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    const isExists = this.dataService
      .getAllArtists()
      .find((el) => el.id === id);
    if (!isExists) return false;
    this.dataService.addArtistToFav(id);
    return id;
  }

  findAll() {
    return this.dataService.getAllArtistFavs();
  }

  remove(id: string) {
    if (!this.findAll().includes(id)) return false;
    this.dataService.deleteArtistFav(id);
    return id;
  }
}
