import { Module } from '@nestjs/common';
import { FavAlbumService } from './album.service';
import { FavAlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbums } from './entities/album.entity';
import { Album } from 'src/post/album/entities/album.entity';

@Module({
  controllers: [FavAlbumController],
  providers: [FavAlbumService],
  imports: [TypeOrmModule.forFeature([Album, FavAlbums])],
})
export class FavAlbumModule {}
