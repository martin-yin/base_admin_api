import { Module } from '@nestjs/common';
import { MountModule } from './mount/mount.module';
import { PetModule } from './pet/pet.module';
import { ToyModule } from './toy/toy.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [MountModule, PetModule, ToyModule, AchievementModule],
  controllers: [],
  providers: [],
  exports: [MountModule, PetModule, ToyModule, AchievementModule],
})
export class GameDataModule {}
