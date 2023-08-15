import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@nestjs/core';

const ROUTES: Routes = [{ path: '/auth', module: AuthModule }];

@Module({
  imports: [
    ConfigModule.forRoot(),
    RouterModule.register(ROUTES),
    PostModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
