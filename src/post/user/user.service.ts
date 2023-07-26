import { HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import {
  isCreateUserData,
  isUpdateUserData,
  statusResponse,
} from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private dataBase: DataService) {}

  create(createUserDto: CreateUserDto) {
    if (!isCreateUserData(createUserDto)) {
      return statusResponse(HttpStatus.BAD_REQUEST);
    }
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      login: createUserDto.login,
      password: createUserDto.password,
    };
    return this.dataBase.createUser(dto);
  }

  findAll() {
    return this.dataBase.getAllUsers();
  }

  findOne(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const res = this.dataBase.getUser(id);
    return res ? res : statusResponse(HttpStatus.NOT_FOUND);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    if (!isUpdateUserData(updatePasswordDto)) {
      return statusResponse(HttpStatus.BAD_REQUEST);
    }
    const updateUser = this.dataBase.updateUser(id, updatePasswordDto);
    if (updateUser === null) return statusResponse(HttpStatus.FORBIDDEN);
    return updateUser ? updateUser : statusResponse(HttpStatus.NOT_FOUND);
  }

  remove(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const user = this.dataBase.deleteUser(id);
    return user ? user : statusResponse(HttpStatus.NOT_FOUND);
  }
}
