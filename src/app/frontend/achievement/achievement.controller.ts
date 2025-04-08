import { AchievementService } from '@/app/admin/achievement/achievement.service';
import { Controller, Get } from '@nestjs/common';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  async syncData() {
    return this.achievementService.sysncData();
  }
}
