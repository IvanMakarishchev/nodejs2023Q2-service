import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataService } from 'src/common/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, DataService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
