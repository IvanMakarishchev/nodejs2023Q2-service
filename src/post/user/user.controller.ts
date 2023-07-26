import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import { HTTP_MESSAGES } from 'src/common/constants';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: CreateUserDto) {
    const createResponse = this.userService.create(userData);
    if ('error' in createResponse) {
      throw new HttpException(
        HTTP_MESSAGES[createResponse.error],
        createResponse.error,
      );
    }
    return createResponse;
  }

  @Get()
  findAll() {
    const allData = this.userService.findAll();
    return allData;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userResponse = this.userService.findOne(id);
    if ('error' in userResponse) {
      throw new HttpException(
        HTTP_MESSAGES[userResponse.error],
        userResponse.error,
      );
    }
    return userResponse;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordDto) {
    const updateResponse = this.userService.update(id, updateUserDto);
    if ('error' in updateResponse) {
      throw new HttpException(
        HTTP_MESSAGES[updateResponse.error],
        updateResponse.error,
      );
    }
    return updateResponse;
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
