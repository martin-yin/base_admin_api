import { Module } from '@nestjs/common';
import { CollectGalleryController } from './collect-gallery.controller';

@Module({
  imports: [],
  controllers: [CollectGalleryController],
  providers: [],
})
export class CollectGalleryModule {}
