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

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return 'HELLO AUTH';
  }

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
  async create(@Body() signupDto: AuthDto) {
    return await this.authService.signUp(signupDto);
  }
}
