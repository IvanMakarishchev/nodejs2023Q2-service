import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  trackId: string;
}
