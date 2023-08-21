import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const logMessage = (...args: Array<string | number>): string | number =>
  args.reduce((acc: string, el: string | number) => (acc += `${el} `), '');

@Injectable()
export class LogMiddleware implements NestMiddleware {
  httpLogger: Logger;
  constructor() {
    this.httpLogger = new Logger('HTTP');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body, ip } = req;
    res.on('finish', () => {
      const { statusCode, statusMessage } = res;

      const mes: (string | number)[] = [
        logMessage(method, originalUrl, ip, '-', statusCode, statusMessage),
      ];
      if (Object.keys(body).length)
        mes.push(logMessage(`BODY ${JSON.stringify(body)}`));
      if (Object.keys(query).length)
        mes.push(logMessage(`QUERY ${JSON.stringify(query)}`));

      if (statusCode < 400) {
        this.httpLogger.log(mes.join('\n'));
      }
      if (statusCode >= 400 && statusCode < 500) {
        this.httpLogger.warn(mes.join('\n'));
      }
      if (statusCode >= 500) {
        this.httpLogger.error(mes.join('\n'));
      }
    });

    next();
  }
}
