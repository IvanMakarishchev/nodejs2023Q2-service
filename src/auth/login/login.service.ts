import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { User } from 'src/post/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async logIn(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { login: loginDto.login },
    });
    return user.password === loginDto.password;
  }
}
