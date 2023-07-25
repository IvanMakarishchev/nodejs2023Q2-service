import { HttpStatus } from '@nestjs/common';

export const statusResponse = (code: HttpStatus) => {
  return { error: code };
};
