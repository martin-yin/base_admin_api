import { Controller, Get } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('game-data/pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  getAll() {
    return this.petService.findAll();
  }
}
