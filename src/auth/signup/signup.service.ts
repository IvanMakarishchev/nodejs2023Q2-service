import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from 'src/post/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignupDto) {
    const user = this.userRepository.create(signUpDto);
    return await this.userRepository.save(user).then((user) => {
      login: user.login;
    });
  }
}
