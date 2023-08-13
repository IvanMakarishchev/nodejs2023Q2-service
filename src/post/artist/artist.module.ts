import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataService } from 'src/common/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DataService],
  imports: [TypeOrmModule.forFeature([Artist, Track, Album])],
})
export class ArtistModule {}
