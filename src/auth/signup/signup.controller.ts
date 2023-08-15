import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';

@Controller()
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return await this.signupService.signUp(signupDto);
  }
}
