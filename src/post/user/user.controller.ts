import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, User } from 'src/common/interfaces';
import { HTTP_MESSAGES } from 'src/common/constants';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: User) {
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    const allData = this.userService.findAll();
    return allData;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userResponse = this.userService.findOne(id);
    console.log('USER: ', userResponse);
    if ('error' in userResponse) {
      throw new HttpException(
        HTTP_MESSAGES[userResponse.error],
        userResponse.error,
      );
    }
    return userResponse;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.userService.remove(id);
    if ('error' in deleteResponse) {
      throw new HttpException(
        HTTP_MESSAGES[deleteResponse.error],
        deleteResponse.error,
      );
    }
    return res.status(HttpStatus.NO_CONTENT).send(deleteResponse);
  }
}
