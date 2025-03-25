import { Result } from '@/core/types/result.interface';
import { get_current_time } from '@/core/utils';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Result> {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Result> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data: Result) => {
        return {
          status: true,
          code: HttpStatus.OK,
          data,
          time: get_current_time(),
          path: request.url,
        } as any;
      }),
    );
  }
}
