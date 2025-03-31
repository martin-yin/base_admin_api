// upload.module.ts
import { Module } from '@nestjs/common';
import { CollectGalleryModule } from '../collect-gallery/collect-gallery.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [CollectGalleryModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
