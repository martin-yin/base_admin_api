import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementService } from './achievement.service';
import { AchievementEntity } from './entity/index.entity';
import { AchievementController } from './achievement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity])],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
