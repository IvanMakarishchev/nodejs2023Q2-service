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
    private readonly userRepository: Repository<Track>,
  ) {}
  async create(data: CreateTrackDto) {
    const dto = this.userRepository.create(data);
    console.log(data);
    return await this.userRepository.save(dto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);
    return !track
      ? false
      : await this.userRepository
          .update(track, { ...track, ...dto })
          .then(async () => await this.findOne(id));
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return !track ? false : await this.userRepository.delete(id);
  }
}
