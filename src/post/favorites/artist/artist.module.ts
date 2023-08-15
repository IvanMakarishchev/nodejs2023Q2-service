import { Module } from '@nestjs/common';
import { FavArtistService } from './artist.service';
import { FavArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavArtists } from './entities/artist.entity';
import { Artist } from 'src/post/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, FavArtists])],
  controllers: [FavArtistController],
  providers: [FavArtistService],
})
export class FavArtistModule {}
