import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/post/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async logIn(loginDto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    if (user.password !== loginDto.password) return false;
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: AuthDto) {
    const user = this.userRepository.create(signupDto);
    return await this.userRepository.save(user).then((user) => {
      login: user.login;
    });
  }
}
