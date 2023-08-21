import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { RouterModule } from '@nestjs/core';
import { FavoritesModule } from './favorites/favorites.module';

const ROUTES = [{ path: '/favs', module: FavoritesModule }];

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    RouterModule.register(ROUTES),
  ],
})
export class PostModule {}
