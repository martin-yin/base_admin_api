import {
  HttpStatus,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { APP_PIPE } from '@nestjs/core';
import { ApiException } from '../exceptions/api.exception';
import { ApiCode } from '../enums/api-code.enum';

export const ValidationProvider = {
  provide: APP_PIPE,
  useFactory: () => {
    const options: ValidationPipeOptions = {
      disableErrorMessages: false,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    };
    const { disableErrorMessages, errorHttpStatusCode } = options;

    return new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const firstError = errors.shift();
        const { constraints, contexts } = firstError;

        // 禁用错误信息
        if (disableErrorMessages) {
          const errorHttp: any = new HttpErrorByCode[errorHttpStatusCode]();
          return new ApiException(errorHttp.message, errorHttp.status);
        }

        // 将未通过验证的字段的错误信息和状态码，以ApiException的形式抛给我们的全局异常过滤器
        for (const key in constraints) {
          return new ApiException(
            constraints[key],
            errorHttpStatusCode,
            contexts ? contexts[key].code : ApiCode.PARAM_ERROR || 0,
          );
        }
      },
    });
  },
};
