import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../interfaces/result.interface';
import { get_current_time } from '../utils';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Result> {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    // 解析ExecutionContext的数据内容获取请求体
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data: Result) => {
        let result;

        if (typeof data === 'string') {
          result = {
            status: true,
            code: HttpStatus.OK,
            data,
            time: get_current_time(),
            path: request.url,
          };
        } else {
          result = {
            ...data,
            time: get_current_time(),
            path: request.url,
          };
        }

        return result;
      }),
    );
  }
}
