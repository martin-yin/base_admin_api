import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementEntity } from './entitys/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity])],
  controllers: [],
  providers: [],
})
export class AchievementsModule {}
