import { Controller, Get } from '@nestjs/common';
import { GameDataService } from './game-data.service';

@Controller('admin/game-data')
export class GameDataController {
  constructor(private readonly gameDataService: GameDataService) {}

  @Get('pet')
  async getPetList() {
    return await this.gameDataService.getPetList();
  }

  @Get('toy')
  async getToyList() {
    return await this.gameDataService.getToyList();
  }

  @Get('mount')
  async getMountList() {
    return await this.gameDataService.getMountList();
  }

  @Get('achievement')
  async getAchievementList() {
    return await this.gameDataService.getAchievementList();
  }
}
