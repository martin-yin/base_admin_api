// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MountModule } from '../game-collection/mount/mount.module';
import { UploadService } from './upload.service';

@Module({
  imports: [MountModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
