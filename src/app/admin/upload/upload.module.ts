// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MountModule } from '../game-collection/mount/mount.module';
import { UploadService } from './upload.service';
import { ToyModule } from '../game-collection/toy/toy.module';
import { PetModule } from '../game-collection/pet/pet.module';

@Module({
  imports: [MountModule, ToyModule, PetModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
