import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DataService],
})
export class ArtistModule {}
