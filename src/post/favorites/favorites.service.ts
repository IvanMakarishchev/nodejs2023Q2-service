import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { FavArtists } from './artist/entities/artist.entity';
import { FavTracks } from './track/entities/track.entity';
import { FavAlbums } from './album/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavArtists)
    private readonly favArtistRepository: Repository<FavArtists>,
    @InjectRepository(FavTracks)
    private readonly favTrackRepository: Repository<FavTracks>,
    @InjectRepository(FavAlbums)
    private readonly favAlbumRepository: Repository<FavAlbums>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async findAll() {
    const favArtists = await this.favArtistRepository.find();
    const favTracks = await this.favTrackRepository.find();
    const favAlbums = await this.favAlbumRepository.find();
    const favs = {
      artists: await this.artistsRepository.findBy({
        id: In(favArtists.map((el) => el.artistId)),
      }),
      tracks: await this.tracksRepository.findBy({
        id: In(favTracks.map((el) => el.trackId)),
      }),
      albums: await this.albumsRepository.findBy({
        id: In(favAlbums.map((el) => el.albumId)),
      }),
    };
    return favs;
  }
}
