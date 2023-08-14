import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourseOptions(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
