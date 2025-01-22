import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  exports: [LoggerModule],
})
export class CommonModule {}
