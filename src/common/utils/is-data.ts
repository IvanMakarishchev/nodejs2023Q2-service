export const isCreateUserData = (obj: any): boolean => {
  return (
    'login' in obj &&
    'password' in obj &&
    typeof obj.login === 'string' &&
    typeof obj.password === 'string'
  );
};

export const isUpdateUserData = (obj: any): boolean => {
  return (
    'oldPassword' in obj &&
    'newPassword' in obj &&
    typeof obj.oldPassword === 'string' &&
    typeof obj.newPassword === 'string'
  );
};

export const isTrackData = (obj: any): boolean => {
  return (
    'name' in obj &&
    'artistId' in obj &&
    'albumId' in obj &&
    'duration' in obj &&
    typeof obj.name === 'string' &&
    (typeof obj.artistId === 'string' || obj.artistId === null) &&
    (typeof obj.albumId === 'string' || obj.albumId === null) &&
    typeof obj.duration === 'number'
  );
};

export const isArtistData = (obj: any): boolean => {
  return (
    'name' in obj &&
    'grammy' in obj &&
    typeof obj.name === 'string' &&
    typeof obj.grammy === 'boolean'
  );
};
