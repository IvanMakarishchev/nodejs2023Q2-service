import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public';
import { sendResponse } from 'src/common/utils';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return 'HELLO AUTH';
  }

  @Public()
  @Post('login')
  async logIn(@Body() loginDto: AuthDto, @Res() res: Response) {
    const req = await this.authService.logIn(loginDto);
    console.log(req);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Public()
  @Post('signup')
  async create(@Body() signupDto: AuthDto, @Res() res: Response) {
    const req = await this.authService.signUp(signupDto);
    return sendResponse[HttpStatus.CREATED](res, req);
  }
}
