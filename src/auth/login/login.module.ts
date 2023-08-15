import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from 'src/post/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: configService.get('TOKEN_EXPIRE_TIME') },
    }),
  ],
})
export class LoginModule {}
