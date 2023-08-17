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
  ParseUUIDPipe,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { sendResponse } from 'src/common/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public';

const route = 'user';
@Controller(route)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto, @Res() res: Response) {
    return await this.userService.create(dto).then((data) => {
      return sendResponse[HttpStatus.CREATED](res, {
        ...data,
        createdAt: data.createdTimeStamp,
        updatedAt: data.udatedTimeStamp,
      });
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    return await this.userService
      .findAll()
      .then((data) => sendResponse[HttpStatus.OK](res, data));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.userService
      .findOne(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.OK](res, data),
      );
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    return await this.userService.update(id, dto).then((data) => {
      return data === null
        ? sendResponse[HttpStatus.NOT_FOUND](res, route)
        : !data
        ? sendResponse[HttpStatus.FORBIDDEN](res, route)
        : sendResponse[HttpStatus.OK](res, {
            ...data,
            createdAt: data.createdTimeStamp,
            updatedAt: data.udatedTimeStamp,
          });
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    return await this.userService
      .remove(id)
      .then((data) =>
        !data
          ? sendResponse[HttpStatus.NOT_FOUND](res, route)
          : sendResponse[HttpStatus.NO_CONTENT](res, data),
      );
  }
}
