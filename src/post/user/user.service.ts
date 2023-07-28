import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private dataService: DataService) {}

  create(createUserDto: CreateUserDto) {
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      login: createUserDto.login,
      password: createUserDto.password,
    };
    this.dataService.createUser(dto);
    const { password, ...safeData } = dto;
    return safeData;
  }

  findAll() {
    const res = this.dataService.getAllUsers().map((el) => {
      const { password, ...safeData } = el;
      return safeData;
    });
    return res;
  }

  findOne(id: string) {
    return this.findAll().find((el) => el.id === id);
  }

  update(id: string, dto: UpdatePasswordDto) {
    const data = this.dataService.getAllUsers();
    const index = data.findIndex((el) => el.id === id);
    if (index < 0) return false;
    if (data[index].password !== dto.oldPassword) return null;
    const updatedDto = {
      ...data[index],
      password: dto.newPassword,
      version: data[index].version + 1,
      updatedAt: Date.now(),
    };
    this.dataService.updateUser(index, updatedDto);
    const { password, ...safeData } = updatedDto;
    return safeData;
  }

  remove(id: string) {
    const data = this.findOne(id);
    if (!data) return false;
    this.dataService.deleteUser(id);
    return id;
  }
}
