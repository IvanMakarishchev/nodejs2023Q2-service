import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async create(data: CreateAlbumDto) {
    const album = this.albumRepository.create(data);
    return await this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    return await this.albumRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    return !album
      ? false
      : await this.albumRepository.save({ ...album, ...dto });
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    if (!album) return false;
    const tracks = await this.trackRepository.findBy({ albumId: id });
    tracks.forEach(
      async (track) =>
        await this.trackRepository.save({ ...track, albumId: null }),
    );
    return await this.albumRepository.delete(id);
  }
}
