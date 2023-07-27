import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userData: CreateUserDto, @Res() res: Response) {
    const createResponse = this.userService.create(userData);
    return sendResponse[createResponse.status](createResponse.body, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const allData = this.userService.findAll();
    return sendResponse[allData.status](allData.body, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const userResponse = this.userService.findOne(id);
    return sendResponse[userResponse.status](userResponse.body, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const updateResponse = this.userService.update(id, updateUserDto);
    return sendResponse[updateResponse.status](updateResponse.body, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const deleteResponse = this.userService.remove(id);
    return sendResponse[deleteResponse.status](deleteResponse.body, res);
  }
}
