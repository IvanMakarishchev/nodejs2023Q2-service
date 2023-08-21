import { Module } from '@nestjs/common';
import { FavTrackService } from './track.service';
import { FavTrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavTracks } from './entities/track.entity';
import { Track } from 'src/post/track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, FavTracks])],
  controllers: [FavTrackController],
  providers: [FavTrackService],
})
export class FavTrackModule {}
