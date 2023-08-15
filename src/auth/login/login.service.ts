import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { User } from 'src/post/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async logIn(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    if (user.password !== loginDto.password) return false;
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
