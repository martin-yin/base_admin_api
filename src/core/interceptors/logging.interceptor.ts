import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import { Result } from '@/core/types';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    // 解析ExecutionContext的数据内容获取请求体
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let params = {};
    if (req.method === 'POST') {
      params = req.body;
    } else if (req.method === 'GET') {
      params = req.query;
    }

    this.loggerService.setContext(LoggingInterceptor.name);
    this.loggerService.info(
      `开始...\n ${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
        req.ip
      }\n 请求参数: ${JSON.stringify(params)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      map((data: Result) => {
        let content = JSON.stringify(data);
        const maxSize = 2000;
        if (content?.length > maxSize)
          content = `${content.substring(0, maxSize)}...`;

        const logFormat = `响应内容: ${content}\n 结束... ${'耗时: ' + (Date.now() - now) + 'ms'}`;
        this.loggerService.http(res.statusCode, logFormat);
        return data;
      }),
    );
  }
}
