import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataService } from 'src/common/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DataService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
