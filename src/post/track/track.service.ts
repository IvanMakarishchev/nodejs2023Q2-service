import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async create(data: CreateTrackDto) {
    const dto = this.trackRepository.create(data);
    return await this.trackRepository.save(dto);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    return await this.trackRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);
    return !track
      ? false
      : await this.trackRepository.save({ ...track, ...dto });
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return !track ? false : await this.trackRepository.delete(id);
  }
}
