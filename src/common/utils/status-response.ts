import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const sendResponse = {
  200: <T>(obj: T, res: Response): Response<T, Record<string, T>> =>
    res.status(HttpStatus.OK).send(obj),
  201: <T>(obj: T, res: Response): Response<T, Record<string, T>> =>
    res.status(HttpStatus.CREATED).send(obj),
  204: <T>(obj: T, res: Response): Response<T, Record<string, T>> =>
    res.status(HttpStatus.NO_CONTENT).send(obj),
  400: (_, res: Response): Response =>
    res.status(HttpStatus.BAD_REQUEST).sendStatus(HttpStatus.BAD_REQUEST),
  403: (_, res: Response): Response =>
    res.status(HttpStatus.FORBIDDEN).sendStatus(HttpStatus.FORBIDDEN),
  404: (_, res: Response): Response =>
    res.status(HttpStatus.NOT_FOUND).sendStatus(HttpStatus.NOT_FOUND),
  422: (_, res: Response): Response =>
    res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .sendStatus(HttpStatus.UNPROCESSABLE_ENTITY),
};
