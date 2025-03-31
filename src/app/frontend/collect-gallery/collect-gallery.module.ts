import { Module } from '@nestjs/common';
import { CollectGalleryModule as AdminCollectGalleryModule } from '@/app/admin/collect-gallery/collect-gallery.module';
import { CollectGalleryController } from './collect-gallery.controller';

@Module({
  imports: [AdminCollectGalleryModule],
  controllers: [CollectGalleryController],
  providers: [],
})
export class CollectGalleryModule {}
