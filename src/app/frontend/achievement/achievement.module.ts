import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';

@Module({
  imports: [],
  controllers: [AchievementController],
  providers: [],
})
export class AchievementModule {}
