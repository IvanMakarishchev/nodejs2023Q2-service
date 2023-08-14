import { Injectable } from '@nestjs/common';
import { FavTracks } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/post/track/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavTrackService {
  constructor(
    @InjectRepository(FavTracks)
    private readonly favTrackRepository: Repository<FavTracks>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) return false;
    const dto = this.favTrackRepository.create({ trackId: id });
    await this.favTrackRepository.save(dto);
    return id;
  }

  async findAllTracksFavs() {
    return await this.favTrackRepository.find();
  }

  async removeTrackFromFavs(id: string) {
    return await this.favTrackRepository.delete({ trackId: id });
  }
}
