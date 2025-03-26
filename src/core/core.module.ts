import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({})
export class CoreModule {
  static forRoot() {
    return {
      module: CoreModule,
      imports: [
        LoggerModule,
        DatabaseModule,
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
