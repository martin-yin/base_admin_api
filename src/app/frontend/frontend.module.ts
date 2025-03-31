import { Module } from '@nestjs/common';
import { CollectGalleryModule } from './collect-gallery/collect-gallery.module';

@Module({
  imports: [CollectGalleryModule],
  controllers: [],
  providers: [],
})
export class FrontendModule {}
