import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Global()
@Module({})
export class CoreModule {
  static forRoot() {
    return {
      module: CoreModule,
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
    };
  }
}
