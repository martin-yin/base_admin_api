import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './core/logger/logger.module';

@Global()
@Module({})
export class CommonModule {
  static forRoot() {
    return {
      module: CommonModule,
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
