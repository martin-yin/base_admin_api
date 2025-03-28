import { Controller, Get } from '@nestjs/common';
import { AchievementService } from './achievement.service';

@Controller('achievement')
export class AchievementController {
  constructor(private achievementService: AchievementService) {}

  @Get()
  getAll() {
    return this.achievementService.findAll();
  }
}
