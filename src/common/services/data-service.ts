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

  getUserById(id: string) {
    return this.dataBase.users.find((user) => user.id === id);
  }

  createUser(dto: User) {
    this.dataBase.users.push(dto);
    const { password, ...safeData } = dto;
    return safeData;
  }

  getAllUsers() {
    const res = this.dataBase.users.map((user) => {
      const { password, ...safeData } = user;
      return safeData;
    });
    return res;
  }

  getUser(id: string) {
    const user = this.getUserById(id);
    if (!user) return false;
    const { password, ...safeData } = user;
    return safeData;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUserById(id);
    if (!user) return false;
    const { password: pas, ...safeData } = user;
    if (pas !== updatePasswordDto.oldPassword) return null;
    const userUpdatedData: User = {
      ...safeData,
      password: updatePasswordDto.newPassword,
      version: safeData.version + 1,
      updatedAt: Date.now(),
    };
    const userIndex = this.dataBase.users.findIndex((user) => user.id === id);
    this.dataBase.users[userIndex] = userUpdatedData;
    const { password, ...resData } = userUpdatedData;
    console.log(resData);
    return resData;
  }

  deleteUser(id: string) {
    const user = this.getUserById(id);
    if (user) {
      this.dataBase.users = this.dataBase.users.filter(
        (user) => user.id !== id,
      );
    }
    return user ? user : false;
  }
}
