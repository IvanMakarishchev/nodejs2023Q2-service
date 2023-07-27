import { Module } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavAlbumModule } from './album/album.module';
import { FavArtistModule } from './artist/artist.module';
import { FavTrackModule } from './track/track.module';
import { RouterModule } from '@nestjs/core';

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
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, DataService],
})
export class FavoritesModule {}
