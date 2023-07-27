import { HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { DataService } from 'src/common/services';

@Injectable()
export class FavAlbumService {
  constructor(private dataService: DataService) {}

  create(id: string) {
    let s = HttpStatus.CREATED;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const createResponse = this.dataService.addAlbumToFav(id);
    if (!createResponse && s === HttpStatus.CREATED)
      s = HttpStatus.UNPROCESSABLE_ENTITY;
    return { status: s, body: createResponse };
  }

  findAll() {
    const allAlbumFavs = this.dataService.getAllAlbumFavs();
    return { status: HttpStatus.OK, body: allAlbumFavs };
  }

  remove(id: string) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const deleteResponse = this.dataService.deleteAlbumFav(id);
    if (!deleteResponse && s === HttpStatus.NO_CONTENT)
      s = HttpStatus.UNPROCESSABLE_ENTITY;
    return { status: s, body: deleteResponse };
  }
}
