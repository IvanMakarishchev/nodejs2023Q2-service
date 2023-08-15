import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { RefreshModule } from './refresh/refresh.module';
import { RouterModule, Routes } from '@nestjs/core';

const ROUTES: Routes = [
  { path: '*/login', module: LoginModule },
  { path: '*/signup', module: SignupModule },
  { path: '*/refresh', module: RefreshModule },
];

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    RouterModule.register(ROUTES),
    SignupModule,
    LoginModule,
    RefreshModule,
  ],
})
export class AuthModule {}
