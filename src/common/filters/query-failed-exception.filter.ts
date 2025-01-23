import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { get_current_time } from '../utils';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const data = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      status: false,
      message: exception.message,
      time: get_current_time(),
      path: req.url,
    };

    this.loggerService.setContext(QueryFailedExceptionFilter.name);
    this.loggerService.exception(
      HttpStatus.INTERNAL_SERVER_ERROR,
      data,
      req,
      exception,
    );

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
  }
}
