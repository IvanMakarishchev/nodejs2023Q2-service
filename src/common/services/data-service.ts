import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  DataBase,
  UpdatePasswordDto,
  User,
} from '../interfaces/interfaces';
import { randomUUID } from 'crypto';
import { BASIC_DATABASE } from '../constants';
import { isUUID } from 'class-validator';
import { isCreateUserData, isUpdateUserData, statusResponse } from '../utils';

@Injectable()
export class DataService {
  private dataBase: DataBase = BASIC_DATABASE;

  createUser(createUserDto: CreateUserDto) {
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
    this.dataBase.users.push(dto);
    const { password, ...resData } = dto;
    return resData;
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
    if (!isUpdateUserData(updatePasswordDto)) {
      return statusResponse(HttpStatus.BAD_REQUEST);
    }
    const userData = this.getUser(id);
    if ('error' in userData) return userData;
    if (userData.password !== updatePasswordDto.oldPassword)
      return statusResponse(HttpStatus.FORBIDDEN);
    const userUpdatedData: User = {
      ...userData,
      password: updatePasswordDto.newPassword,
      version: userData.version + 1,
      updatedAt: Date.now(),
    };
    const userIndex = this.dataBase.users.findIndex((user) => user.id === id);
    this.dataBase.users[userIndex] = userUpdatedData;
    const { password, ...resData } = userUpdatedData;
    return resData;
  }

  deleteUser(id: string) {
    const userData = this.getUser(id);
    if ('error' in userData) return userData;
    this.dataBase.users = this.dataBase.users.filter((user) => user.id !== id);
    return userData;
  }
}
