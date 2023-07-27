import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataService } from 'src/common/services';

@Module({
  controllers: [UserController],
  providers: [UserService, DataService],
})
export class UserModule {}
