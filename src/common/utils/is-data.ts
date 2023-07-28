import { isUUID } from 'class-validator';
import { Album, Artist, Track, UpdatePasswordDto, User } from '../interfaces';

export const isCreateUserData = (obj: any): obj is User => {
  return (
    'login' in obj &&
    'password' in obj &&
    typeof obj.login === 'string' &&
    typeof obj.password === 'string'
  );
};

export const isUpdateUserData = (obj: any): obj is UpdatePasswordDto => {
  return (
    'oldPassword' in obj &&
    'newPassword' in obj &&
    typeof obj.oldPassword === 'string' &&
    typeof obj.newPassword === 'string'
  );
};

export const isTrackData = (obj: any): obj is Track => {
  return (
    'name' in obj &&
    'artistId' in obj &&
    'albumId' in obj &&
    'duration' in obj &&
    typeof obj.name === 'string' &&
    (isUUID(obj.artistId) || obj.artistId === null) &&
    (isUUID(obj.albumId) || obj.albumId === null) &&
    typeof obj.duration === 'number'
  );
};

export const isArtistData = (obj: any): obj is Artist => {
  return (
    'name' in obj &&
    'grammy' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.grammy === 'boolean'
  );
};

export const isAlbumData = (obj: any): obj is Album => {
  return (
    'name' in obj &&
    'year' in obj &&
    'artistId' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.year === 'number' &&
    (isUUID(obj.artistId) || obj.artistId === null)
  );
};
