import { get_current_time } from '@/common/utils';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { ApiException } from '../exceptions';
import { LoggerService } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggerSerivce: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();
    const data = {
      code:
        exception instanceof ApiException ? exception?.Code || status : status,
      status: false,
      message: exception.message,
      time: get_current_time(),
      path: req.url,
    };

    if (exception instanceof ThrottlerException) {
      data.message = '请求太过频繁，请稍后再试';
    }

    this.loggerSerivce.setContext(HttpExceptionFilter.name);
    const logFormat = `${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
      req.ip
    }\n 响应内容: ${JSON.stringify(data.message)}`;
    this.loggerSerivce.http(status, logFormat);

    res.status(status).json(data);
  }
}
