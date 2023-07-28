import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';

@Injectable()
export class FavoritesService {
  constructor(private dataService: DataService) {}

  findAll() {
    const dto = {
      artists: this.dataService
        .getAllArtists()
        .filter((el) => this.dataService.getAllFavs().artists.includes(el.id)),
      albums: this.dataService
        .getAllAlbums()
        .filter((el) => this.dataService.getAllFavs().albums.includes(el.id)),
      tracks: this.dataService
        .getAllTracks()
        .filter((el) => this.dataService.getAllFavs().tracks.includes(el.id)),
    };
    return dto;
  }
}
