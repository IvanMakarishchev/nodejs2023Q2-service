import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album } from 'src/common/interfaces';
import { DataService } from 'src/common/services';

@Injectable()
export class AlbumService {
  constructor(private dataService: DataService) {}
  create(data: Album) {
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...data,
    };
    this.dataService.createAlbum(dto);
    return dto;
  }

  findAll() {
    return this.dataService.getAllAlbums();
  }

  findOne(id: string) {
    return this.findAll().find((el) => el.id === id);
  }

  update(id: string, dto: Album) {
    const data = this.dataService.getAllAlbums();
    const index = data.findIndex((el) => el.id === id);
    if (index < 0) return false;
    const updatedDto = {
      ...data[index],
      ...dto,
    };
    this.dataService.updateAlbum(index, updatedDto);
    return updatedDto;
  }

  remove(id: string) {
    this.dataService.getAllTracks().forEach((track, index) => {
      if (track.albumId === id) {
        this.dataService.updateTrack(index, { ...track, albumId: null });
      }
    });
    const data = this.findOne(id);
    if (!data) return false;
    this.dataService.deleteAlbum(id);
    return id;
  }
}
