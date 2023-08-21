import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/guard/auth.guard';
import { LogMiddleware } from './common/utils/log.middleware';
import { AppController } from './app.controller';

const ROUTES: Routes = [{ path: '/auth', module: AuthModule }];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register(ROUTES),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourceOptions(),
    }),
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
