import { Module } from '@nestjs/common';
import { CollectGalleryService } from './collect-gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from './entity/toy.entity';
import { BattlePetEntity } from './entity/battle.pet.entity';
import { MountEntity } from './entity/mounts.entity';
import { AchievementEntity } from './entity/achievement.entity';
import { CollectGalleryController } from './collect-gallery.controller';
import { WowVersionModule } from '../wow-version/wow-version.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToyEntity,
      BattlePetEntity,
      MountEntity,
      AchievementEntity,
    ]),
    WowVersionModule,
  ],
  controllers: [CollectGalleryController],
  providers: [CollectGalleryService],
  exports: [CollectGalleryService],
})
export class CollectGalleryModule {}
