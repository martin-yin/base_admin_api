import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService: ConfigService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);
  // 全局过滤器
  app.useGlobalFilters(
    new AllExceptionsFilter(loggerService),
    new HttpExceptionFilter(loggerService),
    // new QueryFailedExceptionFilter(loggerService),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
