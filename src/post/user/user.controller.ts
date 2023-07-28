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

const route = 'user';
@Controller(route)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto, @Res() res: Response) {
    if (!isCreateUserData(dto))
      return sendResponse[HttpStatus.BAD_REQUEST](res);
    const req = this.userService.create(dto);
    return sendResponse[HttpStatus.CREATED](res, req);
  }

  @Get()
  findAll(@Res() res: Response) {
    const req = this.userService.findAll();
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.userService.findOne(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id, '4') || !isUpdateUserData(dto))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.userService.update(id, dto);
    if (req === null) return sendResponse[HttpStatus.FORBIDDEN](res, route);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.OK](res, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id, '4'))
      return sendResponse[HttpStatus.BAD_REQUEST](res, route);
    const req = this.userService.remove(id);
    if (!req) return sendResponse[HttpStatus.NOT_FOUND](res, route);
    return sendResponse[HttpStatus.NO_CONTENT](res, req);
  }
}
