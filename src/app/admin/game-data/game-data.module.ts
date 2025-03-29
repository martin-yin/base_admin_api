import { Module } from '@nestjs/common';
import { GameDataService } from './game-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from './entity/toy.entity';
import { PetEntity } from './entity/pet.entity';
import { MountEntity } from './entity/mounts.entity';
import { AchievementEntity } from './entity/achievement.entity';
import { GameDataController } from './game-data.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToyEntity,
      PetEntity,
      MountEntity,
      AchievementEntity,
    ]),
  ],
  controllers: [GameDataController],
  providers: [],
  exports: [GameDataService],
})
export class GameDataModule {}
