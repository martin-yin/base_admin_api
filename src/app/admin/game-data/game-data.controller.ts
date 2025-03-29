import { Controller } from '@nestjs/common';
import { GameDataService } from './game-data.service';

@Controller()
export class GameDataController {
  constructor(private readonly gameDataService: GameDataService) {}

  async getPetList() {
    return await this.gameDataService.getPetList();
  }
}
