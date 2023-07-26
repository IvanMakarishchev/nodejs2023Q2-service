import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DataService],
})
export class AlbumModule {}
