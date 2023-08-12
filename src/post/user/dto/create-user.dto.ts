import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
