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
    return this.appService.getHello();
  }
}
