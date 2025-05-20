import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorsHandler implements ExceptionFilter {
  private readonly logger = new Logger(ErrorsHandler.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    switch (true) {
      case exception instanceof HttpException:
        this.logger.error(exception.message, exception.stack);
        this.reply(response, exception.getStatus(), exception.getResponse());
        break;
      case exception instanceof Error:
        this.logger.error(exception.message, exception.stack);
        this.reply(response, HttpStatus.INTERNAL_SERVER_ERROR);
        break;
    }
  }

  private reply(
    res: Response,
    status: number,
    message: string | object = 'Internal server error',
  ): void {
    const timestamp = new Date().toISOString();

    if (typeof message === 'string')
      res.status(status).json({ status, message, timestamp });
    else if (typeof message === 'object')
      res.status(status).json({ ...message, timestamp });
  }
}
