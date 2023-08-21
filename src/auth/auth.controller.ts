import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async logIn(@Body() loginDto: AuthDto) {
    const req = await this.authService.logIn(loginDto);
    if (!req) throw new ForbiddenException();
    return req;
  }

  @Public()
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() signupDto: AuthDto) {
    return await this.authService.signUp(signupDto);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    const req = await this.authService.refreshToken(refreshDto);
    if (!req) throw new ForbiddenException();
    return req;
  }
}
