import { Controller, Get } from '@nestjs/common';
import { ToyService } from './toy.service';

@Controller('game-data/toy')
export class ToyController {
  constructor(private toyService: ToyService) {}

  @Get()
  getAll() {
    return this.toyService.findAll();
  }
}
