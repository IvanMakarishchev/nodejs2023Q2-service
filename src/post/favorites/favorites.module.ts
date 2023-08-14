import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavAlbumModule } from './album/album.module';
import { FavArtistModule } from './artist/artist.module';
import { FavTrackModule } from './track/track.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbums } from './album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { FavArtists } from './artist/entities/artist.entity';
import { FavTracks } from './track/entities/track.entity';

const ROUTES = [
  { path: '*/album', module: FavAlbumModule },
  { path: '*/artist', module: FavArtistModule },
  { path: '*/track', module: FavTrackModule },
];
@Module({
  imports: [
    FavAlbumModule,
    FavArtistModule,
    FavTrackModule,
    RouterModule.register(ROUTES),
    TypeOrmModule.forFeature([
      Artist,
      Track,
      Album,
      FavArtists,
      FavTracks,
      FavAlbums,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
