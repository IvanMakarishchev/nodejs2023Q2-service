import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DataService],
})
export class TrackModule {}
