import { Module } from '@nestjs/common';
import { FavAlbumService } from './album.service';
import { FavAlbumController } from './album.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [FavAlbumController],
  providers: [FavAlbumService, DataService],
})
export class FavAlbumModule {}
