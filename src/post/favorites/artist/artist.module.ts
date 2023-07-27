import { Module } from '@nestjs/common';
import { FavArtistService } from './artist.service';
import { FavArtistController } from './artist.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [FavArtistController],
  providers: [FavArtistService, DataService],
})
export class FavArtistModule {}
