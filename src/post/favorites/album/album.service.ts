import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataService } from 'src/common/services';

@Injectable()
export class FavAlbumService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    return this.dataService.addAlbumToFav(id);
  }

  findAll() {
    return this.dataService.getAllAlbumFavs();
  }

  remove(id: string) {
    return this.dataService.deleteAlbumFav(id);
  }
}
