import { Module } from '@nestjs/common';
import { FavTrackService } from './track.service';
import { FavTrackController } from './track.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [FavTrackController],
  providers: [FavTrackService, DataService],
})
export class FavTrackModule {}
