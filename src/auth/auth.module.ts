import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { RefreshModule } from './refresh/refresh.module';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { JwtService } from '@nestjs/jwt';

const ROUTES: Routes = [
  { path: '*/login', module: LoginModule },
  { path: '*/signup', module: SignupModule },
  { path: '*/refresh', module: RefreshModule },
];

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    RouterModule.register(ROUTES),
    SignupModule,
    LoginModule,
    RefreshModule,
  ],
})
export class AuthModule {}
