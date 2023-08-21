import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavArtists } from './entities/artist.entity';
import { Artist } from 'src/post/artist/entities/artist.entity';

@Injectable()
export class FavArtistService {
  constructor(
    @InjectRepository(FavArtists)
    private readonly favArtistRepository: Repository<FavArtists>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) return false;
    const dto = this.favArtistRepository.create({ artistId: id });
    await this.favArtistRepository.save(dto);
    return id;
  }

  async findAllArtistsFavs() {
    return await this.favArtistRepository.find();
  }

  async removeArtistFromFavs(id: string) {
    return await this.favArtistRepository.delete({ artistId: id });
  }
}
