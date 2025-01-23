import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { get_current_time } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const data = {
      code,
      status: false,
      time: get_current_time(),
      path: req.url,
      error: exception.message,
    };

    this.loggerService.setContext(AllExceptionsFilter.name);
    this.loggerService.exception(code, data, req, exception);

    res.status(code).json(data);
  }
}
