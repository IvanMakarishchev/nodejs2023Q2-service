import { Injectable } from '@nestjs/common';
import { Track } from 'src/common/interfaces';
import { DataService } from 'src/common/services';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  constructor(private dataService: DataService) {}
  create(data: Track) {
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      ...data,
    };
    this.dataService.createTrack(dto);
    return dto;
  }

  findAll() {
    return this.dataService.getAllTracks();
  }

  findOne(id: string) {
    return this.findAll().find((el) => el.id === id);
  }

  update(id: string, dto: Track) {
    const data = this.dataService.getAllTracks();
    const index = data.findIndex((el) => el.id === id);
    if (index < 0) return false;
    const updatedDto = {
      ...data[index],
      ...dto,
    };
    this.dataService.updateTrack(index, updatedDto);
    return updatedDto;
  }

  remove(id: string) {
    const data = this.findOne(id);
    if (!data) return false;
    this.dataService.deleteTrack(id);
    return id;
  }
}
