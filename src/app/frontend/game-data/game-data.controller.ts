import { GameDataService } from '@/app/admin/game-data/game-data.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('game-data')
export class GameDataController {
  constructor(private readonly gameDataService: GameDataService) {}

  @Get('collection')
  async getCollectionList() {
    return await this.gameDataService.getCollectionProcess(1);
  }
  @Get('pet')
  async getPetList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('user_id') user_id?: number,
  ) {
    return await this.gameDataService.getPetList(page, limit, 1);
  }

  @Get('toy')
  async getToyList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('user_id') user_id?: number,
  ) {
    return await this.gameDataService.getToyList(page, limit, user_id);
  }

  @Get('mount')
  async getMountList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('user_id') user_id?: number,
  ) {
    return await this.gameDataService.getMountList(page, limit, user_id);
  }
}
