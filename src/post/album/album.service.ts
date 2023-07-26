import { HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { Album } from 'src/common/interfaces';
import { DataService } from 'src/common/services';
import { isAlbumData, statusResponse } from 'src/common/utils';

@Injectable()
export class AlbumService {
  constructor(private dataService: DataService) {}
  create(createAlbumDto: Album) {
    if (!isAlbumData(createAlbumDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createAlbumDto,
    };
    return this.dataService.createAlbum(dto);
  }

  findAll() {
    return this.dataService.getAllAlbums();
  }

  findOne(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const album = this.dataService.getAlbum(id);
    return album ? album : statusResponse(HttpStatus.NOT_FOUND);
  }

  update(id: string, updateAlbumDto: Album) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    if (!isAlbumData(updateAlbumDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const album = this.dataService.updateAlbum(id, updateAlbumDto);
    return album ? album : statusResponse(HttpStatus.NOT_FOUND);
  }

  remove(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const album = this.dataService.deleteAlbum(id);
    return album ? album : statusResponse(HttpStatus.NOT_FOUND);
  }
}
