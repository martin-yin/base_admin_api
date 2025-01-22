import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './common/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('Error, 不知道报什么错了！');
    return this.appService.getHello();
  }
}
