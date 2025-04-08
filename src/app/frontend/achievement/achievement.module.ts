import { Module } from '@nestjs/common';
import { AchievementsModule as AdminAchievementModule } from '@/app/admin/achievement/achievement.module';
import { AchievementController } from './achievement.controller';

@Module({
  imports: [AdminAchievementModule],
  controllers: [AchievementController],
  providers: [],
})
export class AchievementModule {}
