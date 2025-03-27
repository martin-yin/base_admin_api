import { Controller, Get } from '@nestjs/common';
import { MountService } from './mount.service';

@Controller('mount')
export class MountController {
  constructor(private mountService: MountService) {}

  @Get()
  getAll() {
    return this.mountService.findAll();
  }
}
