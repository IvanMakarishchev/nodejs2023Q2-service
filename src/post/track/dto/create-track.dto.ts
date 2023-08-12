import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsDefined()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsInt()
  @IsDefined()
  duration: number;
}
