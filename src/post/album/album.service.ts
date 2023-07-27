import { HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { Album } from 'src/common/interfaces';
import { DataService } from 'src/common/services';
import { isAlbumData } from 'src/common/utils';

@Injectable()
export class AlbumService {
  constructor(private dataService: DataService) {}
  create(createArtistDto: Album) {
    let s = HttpStatus.CREATED;
    if (!isAlbumData(createArtistDto)) s = HttpStatus.BAD_REQUEST;
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createArtistDto,
    };
    return { status: s, body: this.dataService.createAlbum(dto) };
  }

  findAll() {
    return { status: HttpStatus.OK, body: this.dataService.getAllAlbums() };
  }

  findOne(id: string) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const album = this.dataService.getAlbum(id);
    if (!album && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: album };
  }

  update(id: string, updateAlbumDto: Album) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isAlbumData(updateAlbumDto))
      s = HttpStatus.BAD_REQUEST;
    const album = this.dataService.updateAlbum(id, updateAlbumDto);
    if (!album && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: album };
  }

  remove(id: string) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const album = this.dataService.deleteAlbum(id);
    if (!album && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return { status: s, body: album };
  }
}
