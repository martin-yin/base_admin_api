import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import { join as path_join } from 'node:path';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { dateFormat } from '../utils';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    const LOGGER_FILE = this.configService.get('LOGGER_FILE');
    const LOGGER_CONSOLE = this.configService.get('LOGGER_CONSOLE');

    const dailyRotateFileOption = {
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '30d',
      json: false,
      silent: LOGGER_FILE != 'true',
    };

    return {
      exitOnError: false,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint(),
        format.ms(),
      ),
      transports: [
        new transports.DailyRotateFile({
          ...dailyRotateFileOption,
          level: 'info',
          auditFile: path_join(
            __dirname,
            '..',
            'logs',
            `${dateFormat('yyyy-MM-dd')}-success.json`,
          ),
          filename: `%DATE%-success.log`,
        }),
        new transports.DailyRotateFile({
          ...dailyRotateFileOption,
          level: 'error',
          auditFile: path_join(
            __dirname,
            '..',
            'logs',
            `${dateFormat('yyyy-MM-dd')}-error.json`,
          ),
          filename: `%DATE%-error.log`,
        }),
        new transports.Console({
          silent: LOGGER_CONSOLE != 'true',
          format: format.combine(
            format.printf((info) => {
              console.log(info);
              // 信息格式处理
              const messages =
                info.message ||
                JSON.stringify(
                  _.omit(info, ['context', 'level', 'timestamp', 'ms']),
                );

              const result = `${info.timestamp} ${info.ms}: \n${messages}`;
              return result;
            }),
          ),
        }),
      ],
    };
  }
}
