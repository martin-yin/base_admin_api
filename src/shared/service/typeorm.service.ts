import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('DATABASE_TYPE'),
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PWD'),
      database: this.configService.get('DATABASE_DB'),
      entities: this.configService.get('DATABASE_ENTITIES'),
      subscribers: [this.configService.get('DATABASE_SUBSCRIBERS')],
      synchronize: this.configService.get('DATABASE_SYNCHRONIZE'),
      // dropSchema: this.configService.get('DATABASE_DROPSCHEMA'),
      logging: this.configService.get('DATABASE_LOG'),
      logger: this.configService.get('DATABASE_LOG_TYPE'),
      charset: this.configService.get('DATABASE_CHARSET'),
      autoLoadEntities: true,
      verboseRetryLog: true,
    } as TypeOrmModuleOptions;
  }
}
