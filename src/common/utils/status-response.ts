import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

const message = {
  400: (obj?: string | undefined) =>
    !obj
      ? 'Bad request. body does not contain required fields'
      : `Bad request. ${obj}Id is invalid (not uuid)`,

  403: () => 'oldPassword is wrong',
  404: (obj?: string) => `${obj[0].toUpperCase() + obj.slice(1)} was not found`,
  422: (obj?: string) =>
    `${obj[0].toUpperCase() + obj.slice(1)} with id doesn't exist`,
};

export const sendResponse = {
  200: <T>(res: Response, obj: T): Response<T, Record<string, T>> =>
    res.status(HttpStatus.OK).send(obj),
  201: <T>(res: Response, obj: T): Response<T, Record<string, T>> =>
    res.status(HttpStatus.CREATED).send(obj),
  204: <T>(res: Response, obj: T): Response<T, Record<string, T>> =>
    res.status(HttpStatus.NO_CONTENT).send(obj),
  400: <T>(res: Response, mes?: T): Response<T, Record<string, T>> =>
    res
      .status(HttpStatus.BAD_REQUEST)
      .send(message[400](mes as unknown as string)),
  403: <T>(res: Response, mes?: T): Response<T, Record<string, T>> =>
    res.status(HttpStatus.FORBIDDEN).send(message[403]()),
  404: <T>(res: Response, mes?: T): Response<T, Record<string, T>> =>
    res
      .status(HttpStatus.NOT_FOUND)
      .send(message[404](mes as unknown as string)),
  422: <T>(res: Response, mes?: T): Response<T, Record<string, T>> =>
    res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .send(message[422](mes as unknown as string)),
};
