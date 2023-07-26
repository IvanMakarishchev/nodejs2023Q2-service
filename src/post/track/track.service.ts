import { HttpStatus, Injectable } from '@nestjs/common';
import { Track } from 'src/common/interfaces';
import { DataService } from 'src/common/services';
import { statusResponse } from 'src/common/utils';
import { isTrackData } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private dataService: DataService) {}
  create(createTrackDto: Track) {
    if (!isTrackData(createTrackDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createTrackDto,
    };
    return this.dataService.createTrack(dto);
  }

  findAll() {
    return this.dataService.getAllTracks();
  }

  findOne(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const track = this.dataService.getTrack(id);
    return track ? track : statusResponse(HttpStatus.NOT_FOUND);
  }

  update(id: string, updateTrackDto: Track) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    if (!isTrackData(updateTrackDto))
      return statusResponse(HttpStatus.BAD_REQUEST);
    const track = this.dataService.updateTrack(id, updateTrackDto);
    return track ? track : statusResponse(HttpStatus.NOT_FOUND);
  }

  remove(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const track = this.dataService.deleteTrack(id);
    return track ? track : statusResponse(HttpStatus.NOT_FOUND);
  }
}
