import { HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { Artist } from 'src/common/interfaces';
import { isArtistData, statusResponse } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class ArtistService {
  constructor(private dataService: DataService) {}
  create(createArtistDto: Artist) {
    console.log(createArtistDto);
    if (!isArtistData(createArtistDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createArtistDto,
    };
    return this.dataService.createArtist(dto);
  }

  findAll() {
    return this.dataService.getAllArtists();
  }

  findOne(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const artist = this.dataService.getArtist(id);
    return artist ? artist : statusResponse(HttpStatus.NOT_FOUND);
  }

  update(id: string, updateArtistDto: Artist) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    if (!isArtistData(updateArtistDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const artist = this.dataService.updateArtist(id, updateArtistDto);
    return artist ? artist : statusResponse(HttpStatus.NOT_FOUND);
  }

  remove(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const artist = this.dataService.deleteArtist(id);
    return artist ? artist : statusResponse(HttpStatus.NOT_FOUND);
  }
}
