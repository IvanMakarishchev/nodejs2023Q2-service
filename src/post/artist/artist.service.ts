import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { Artist } from 'src/common/interfaces';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(private dataService: DataService) {}
  create(data: Artist) {
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...data,
    };
    this.dataService.createArtist(dto);
    return dto;
  }

  findAll() {
    return this.dataService.getAllArtists();
  }

  findOne(id: string) {
    return this.findAll().find((el) => el.id === id);
  }

  update(id: string, dto: Artist) {
    const data = this.dataService.getAllArtists();
    const index = data.findIndex((el) => el.id === id);
    if (index < 0) return false;
    const updatedDto = {
      ...data[index],
      ...dto,
    };
    this.dataService.updateArtist(index, updatedDto);
    return updatedDto;
  }

  remove(id: string) {
    this.dataService.getAllTracks().forEach((track, index) => {
      if (track.artistId === id) {
        this.dataService.updateTrack(index, { ...track, artistId: null });
      }
    });
    this.dataService.getAllAlbums().forEach((album, index) => {
      if (album.artistId === id) {
        this.dataService.updateAlbum(index, { ...album, artistId: null });
      }
    });
    const data = this.findOne(id);
    if (!data) return false;
    this.dataService.deleteArtist(id);
    return id;
  }
}
