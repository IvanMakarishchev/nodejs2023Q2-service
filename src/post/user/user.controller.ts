import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from 'src/common/interfaces';
import { Response } from 'express';
import {
  isCreateUserData,
  isUpdateUserData,
  sendResponse,
} from 'src/common/utils';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto, @Res() res: Response) {
    let s = HttpStatus.CREATED;
    if (!isCreateUserData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.userService.create(dto);
    return sendResponse[s](req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.userService.findAll();
    return sendResponse[HttpStatus.OK](req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.userService.findOne(id);
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    let s = HttpStatus.OK;
    if (!isUUID(id, '4') || !isUpdateUserData(dto)) s = HttpStatus.BAD_REQUEST;
    const req = this.userService.update(id, dto);
    if (req === null && s === HttpStatus.OK) s = HttpStatus.FORBIDDEN;
    if (!req && s === HttpStatus.OK) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    let s = HttpStatus.NO_CONTENT;
    if (!isUUID(id, '4')) s = HttpStatus.BAD_REQUEST;
    const req = this.userService.remove(id);
    if (!req && s === HttpStatus.NO_CONTENT) s = HttpStatus.NOT_FOUND;
    return sendResponse[s](req, res);
  }
}
