import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async logIn(@Body() loginDto: LoginDto) {
    const res = await this.loginService.logIn(loginDto);
    console.log(res);
  }
}
