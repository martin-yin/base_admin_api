import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  QueryFailedExceptionFilter,
} from './core/filters';
import { TransformInterceptor, LoggingInterceptor } from './core/interceptors';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  // 配置跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new LoggingInterceptor(loggerService),
  );

  app.setGlobalPrefix('api');

  // 全局拦截器
  app.useGlobalFilters(
    new AllExceptionsFilter(loggerService),
    new HttpExceptionFilter(loggerService),
    new QueryFailedExceptionFilter(loggerService),
  );

  await app.listen(configService.get('PORT'));
}

bootstrap();
