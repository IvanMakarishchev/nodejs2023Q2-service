import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  DataBase,
  UpdatePasswordDto,
} from '../interfaces/interfaces';
import { randomUUID } from 'crypto';
import { BASIC_DATABASE } from '../constants';
import { isUUID } from 'class-validator';
import { statusResponse } from '../utils';

@Injectable()
export class DataService {
  private dataBase: DataBase = BASIC_DATABASE;

  createUser(createUserDto: CreateUserDto) {
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };
    this.dataBase.users.push(dto);
    return dto;
  }

  getAllUsers() {
    return this.dataBase.users;
  }

  getUser(id: string) {
    if (!isUUID(id, '4')) return statusResponse(HttpStatus.BAD_REQUEST);
    const user = this.dataBase.users.find((user) => user.id === id);
    return user ? user : statusResponse(HttpStatus.NOT_FOUND);
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userData = this.getUser(id);
    if ('error' in userData) return userData;
    if (userData.password !== updatePasswordDto.oldPassword)
      return statusResponse(HttpStatus.FORBIDDEN);
    const userUpdatedData = {
      ...userData,
      ...updatePasswordDto,
    };
    return userUpdatedData;
  }

  deleteUser(id: string) {
    const userData = this.getUser(id);
    if ('error' in userData) return userData;
    this.dataBase.users = this.dataBase.users.filter((user) => user.id !== id);
    return userData;
  }
}
