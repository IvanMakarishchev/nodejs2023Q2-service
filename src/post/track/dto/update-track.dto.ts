import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  duration: number;
}
