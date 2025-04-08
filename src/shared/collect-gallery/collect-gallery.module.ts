import { Module } from '@nestjs/common';
import { CollectGalleryService } from './collect-gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from './entitys/toy.entity';
import { BattlePetEntity } from './entitys/battle.pet.entity';
import { MountEntity } from './entitys/mounts.entity';
import { CollectGalleryController } from './collect-gallery.controller';
import { WowVersionModule } from '../wow-version/wow-version.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToyEntity, BattlePetEntity, MountEntity]),
    WowVersionModule,
  ],
  controllers: [CollectGalleryController],
  providers: [CollectGalleryService],
  exports: [CollectGalleryService],
})
export class CollectGalleryModule {}
