// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MountModule } from '../game-data/mount/mount.module';
import { UploadService } from './upload.service';
import { ToyModule } from '../game-data/toy/toy.module';
import { PetModule } from '../game-data/pet/pet.module';
import { AchievementModule } from '../game-data/achievement/achievement.module';

@Module({
  imports: [MountModule, ToyModule, PetModule, AchievementModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
