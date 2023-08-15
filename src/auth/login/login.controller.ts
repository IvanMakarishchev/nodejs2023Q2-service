import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { Public } from 'src/common/decorators/public';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  async logIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const req = await this.loginService.logIn(loginDto); /// JWT token in res
    console.log(req);
    return sendResponse[HttpStatus.OK](res, req);
  }
}
