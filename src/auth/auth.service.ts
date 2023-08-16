import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/post/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  saltRounds: number;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.saltRounds = +this.configService.get('CRYPT_SALT');
  }

  async logIn(loginDto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    if (!user) return false;
    const isAccepted = await bcrypt.compare(loginDto.password, user.password);
    if (!isAccepted) return false;
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: AuthDto) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(signupDto.password, salt);
      const user = this.userRepository.create({ ...signupDto, password: hash });
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
