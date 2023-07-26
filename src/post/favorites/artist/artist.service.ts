import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataService } from 'src/common/services';

@Injectable()
export class FavArtistService {
  constructor(private dataService: DataService) {}
  create(id: string) {
    return this.dataService.addArtistToFav(id);
  }

  findAll() {
    return this.dataService.getAllArtistFavs();
  }

  remove(id: string) {
    return this.dataService.deleteArtistFav(id);
  }
}
