import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/post/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refresh.dto';
import * as bcrypt from 'bcryptjs';
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
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: token,
    };
  }

  async signUp(signupDto: AuthDto) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(signupDto.password, salt);
      const user = this.userRepository.create({ ...signupDto, password: hash });
      return await this.userRepository.save(user).then((data) => {
        const { password, ...safeData } = data;
        return safeData;
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken(refreshDto: RefreshDto) {
    const isValid = await this.isRTValid(refreshDto.refreshToken);
    if (!isValid) return false;
    const payload = { sub: isValid.sub, username: isValid.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshDto.refreshToken,
    };
  }

  private async isRTValid(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
      });
    } catch (e) {
      return false;
    }
  }
}
