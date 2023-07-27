import { HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import { isCreateUserData, isUpdateUserData } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private dataBase: DataService) {}

  create(createUserDto: CreateUserDto) {
    let s = HttpStatus.CREATED;
    if (!isCreateUserData(createUserDto)) s = HttpStatus.BAD_REQUEST;
    const dto = {
      id: randomUUID({ disableEntropyCache: true }),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      login: createUserDto.login,
      password: createUserDto.password,
    };
    return { status: s, body: this.dataBase.createUser(dto) };
  }

  findAll() {
    return { status: HttpStatus.OK, body: this.dataBase.getAllUsers() };
  }

  findOne(id: string) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const res = this.dataBase.getUser(id);
    if (!res && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: res };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isUpdateUserData(updatePasswordDto))
      s = HttpStatus.BAD_REQUEST;
    const updateUser = this.dataBase.updateUser(id, updatePasswordDto);
    if (updateUser === null && s === HttpStatus.OK) s = HttpStatus.FORBIDDEN;
    if (!updateUser && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return { status: s, body: updateUser };
  }

  remove(id: string) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const user = this.dataBase.deleteUser(id);
    if (!user && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return { status: s, body: user };
  }
}
