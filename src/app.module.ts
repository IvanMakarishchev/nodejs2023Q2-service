import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './post/user/entities/user.entity';
import { Track } from './post/track/entities/track.entity';
import { Artist } from './post/artist/entities/artist.entity';
import { Album } from './post/album/entities/album.entity';
import { FavArtists } from './post/favorites/artist/entities/artist.entity';
import { FavTracks } from './post/favorites/track/entities/track.entity';
import { FavAlbums } from './post/favorites/album/entities/album.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [
          User,
          Track,
          Artist,
          Album,
          FavArtists,
          FavTracks,
          FavAlbums,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
