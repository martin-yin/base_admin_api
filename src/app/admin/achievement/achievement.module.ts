import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementService } from './achievement.service';
import { AchievementEntity } from './entity/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity])],
  controllers: [],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
