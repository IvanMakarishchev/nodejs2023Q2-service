import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { User } from 'src/post/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class SignupModule {}
