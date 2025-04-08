import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AchievementCategoryEntity,
  AchievementEntity,
} from './entitys/index.entity';
import { AchievementService } from './achievement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementEntity, AchievementCategoryEntity]),
  ],
  controllers: [],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementsModule {}
