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
