import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';

@Injectable()
export class FavTrackService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    const isExists = this.dataService.getAllTracks().find((el) => el.id === id);
    if (!isExists) return false;
    this.dataService.addTrackToFav(id);
    return id;
  }

  findAll() {
    return this.dataService.getAllTrackFavs();
  }

  remove(id: string) {
    if (!this.findAll().includes(id)) return false;
    this.dataService.deleteTrackFav(id);
    return id;
  }
}
