import { Module } from '@nestjs/common';
import { CollectGalleryService } from './collect-gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from './entity/toy.entity';
import { PetEntity } from './entity/pet.entity';
import { MountEntity } from './entity/mounts.entity';
import { AchievementEntity } from './entity/achievement.entity';
import { CollectGalleryController } from './collect-gallery.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToyEntity,
      PetEntity,
      MountEntity,
      AchievementEntity,
    ]),
  ],
  controllers: [CollectGalleryController],
  providers: [CollectGalleryService],
  exports: [CollectGalleryService],
})
export class CollectGalleryModule {}
