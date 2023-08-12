import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SAFE_FIELDS } from 'src/common/constants';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const dto = this.userRepository.create(createUserDto);
    return await this.userRepository
      .save(dto)
      .then((data) => this.findOne(data.id));
  }

  async findAll() {
    return await this.userRepository.find({
      select: SAFE_FIELDS,
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      select: SAFE_FIELDS,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    return !user
      ? null
      : user.password !== dto.oldPassword
      ? false
      : await this.userRepository
          .save({
            ...user,
            password: dto.newPassword,
          })
          .then(async (data) => this.findOne(data.id));
  }

  async remove(id: string) {
    return await this.findOne(id).then(async (data) =>
      !data ? false : await this.userRepository.delete({ id: id }),
    );
  }
}
