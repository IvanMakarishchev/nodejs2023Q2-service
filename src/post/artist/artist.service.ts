import { HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { Artist } from 'src/common/interfaces';
import { isArtistData } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private dataService: DataService) {}
  create(createArtistDto: Artist) {
    let s = HttpStatus.CREATED;
    if (!isArtistData(createArtistDto)) s = HttpStatus.BAD_REQUEST;
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createArtistDto,
    };
    return { status: s, body: this.dataService.createArtist(dto) };
  }

  findAll() {
    return { status: HttpStatus.OK, body: this.dataService.getAllArtists() };
  }

  findOne(id: string) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const artist = this.dataService.getArtist(id);
    if (!artist && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: artist };
  }

  update(id: string, updateArtistDto: Artist) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isArtistData(updateArtistDto))
      s = HttpStatus.BAD_REQUEST;
    const artist = this.dataService.updateArtist(id, updateArtistDto);
    if (!artist && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: artist };
  }

  remove(id: string) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const artist = this.dataService.deleteArtist(id);
    if (!artist && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return { status: s, body: artist };
  }
}
