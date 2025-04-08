import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AchievementCategoryEntity,
  AchievementEntity,
} from './entitys/index.entity';
import { AchievementService } from './achievement.service';
import { WowVersionModule } from '../wow-version/wow-version.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementEntity, AchievementCategoryEntity]),
    WowVersionModule,
  ],
  controllers: [],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementsModule {}
