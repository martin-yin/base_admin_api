import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  QueryFailedExceptionFilter,
} from './common/filters';
import { LoggerService } from './common/logger/logger.service';
import {
  LoggingInterceptor,
  TransformInterceptor,
} from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(loggerService),
  );

  // 全局拦截器
  app.useGlobalFilters(
    new AllExceptionsFilter(loggerService),
    new HttpExceptionFilter(loggerService),
    new QueryFailedExceptionFilter(loggerService),
  );

  await app.listen(configService.get('PORT'));
}

bootstrap();
