import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async create(data: CreateArtistDto) {
    const dto = this.artistRepository.create(data);
    return await this.artistRepository.save(dto);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    return !artist
      ? false
      : await this.artistRepository.save({ ...artist, ...dto });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    if (!artist) return false;
    const tracks = await this.trackRepository.findBy({ artistId: artist.id });
    const albums = await this.albumRepository.findBy({ artistId: artist.id });
    tracks.forEach(
      async (track) =>
        await this.trackRepository.save({ ...track, artistId: null }),
    );
    albums.forEach(
      async (album) =>
        await this.albumRepository.save({ ...album, artistId: null }),
    );
    return await this.artistRepository.delete(id);
  }
}
