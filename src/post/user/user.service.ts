import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { DataService } from 'src/common/services';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';

@Injectable()
export class UserService {
  constructor(private dataBase: DataService) {}
  create(createUserDto: CreateUserDto) {
    return this.dataBase.createUser(createUserDto);
  }

  findAll() {
    return this.dataBase.getAllUsers();
  }

  findOne(id: string) {
    return this.dataBase.getUser(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.dataBase.updateUser(id, updatePasswordDto);
  }

  remove(id: string) {
    return this.dataBase.deleteUser(id);
  }
}
