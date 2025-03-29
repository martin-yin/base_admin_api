import { Controller, Get } from '@nestjs/common';
import { AchievementService } from './achievement.service';

@Controller('game-data/achievement')
export class AchievementController {
  constructor(private achievementService: AchievementService) {}

  @Get()
  getAll() {
    return this.achievementService.findAll();
  }
}
