import { HttpStatus, Injectable } from '@nestjs/common';
import { Track } from 'src/common/interfaces';
import { DataService } from 'src/common/services';
import { isTrackData } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private dataService: DataService) {}
  create(createTrackDto: Track) {
    let s = HttpStatus.CREATED;
    if (!isTrackData(createTrackDto)) s = HttpStatus.BAD_REQUEST;
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...createTrackDto,
    };
    return { status: s, body: this.dataService.createTrack(dto) };
  }

  findAll() {
    return { status: HttpStatus.OK, body: this.dataService.getAllTracks() };
  }

  findOne(id: string) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const track = this.dataService.getTrack(id);
    if (!track && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: track };
  }

  update(id: string, updateTrackDto: Track) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isTrackData(updateTrackDto))
      s = HttpStatus.BAD_REQUEST;
    const track = this.dataService.updateTrack(id, updateTrackDto);
    if (!track && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: track };
  }

  remove(id: string) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const track = this.dataService.deleteTrack(id);
    if (!track && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return { status: s, body: track };
  }
}
