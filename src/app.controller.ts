import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiException } from './common/exceptions/api.exception';
import { LoggerService } from './common/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: LoggerService,
  ) {}

  @Get()
  getHello() {
    throw new ApiException('发生了一些错误', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
