import { Injectable } from '@nestjs/common';
import { Track } from 'src/common/interfaces';
import { DataService } from 'src/common/services';

@Injectable()
export class FavTrackService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    return this.dataService.addTrackToFav(id);
  }

  findAll() {
    return this.dataService.getAllTrackFavs();
  }

  remove(id: string) {
    return this.dataService.deleteTrackFav(id);
  }
}
