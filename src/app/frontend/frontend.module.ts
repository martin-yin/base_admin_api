import { Module } from '@nestjs/common';
import { CollectGalleryModule } from './collect-gallery/collect-gallery.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CollectGalleryModule, UserModule],
  controllers: [],
  providers: [],
})
export class FrontendModule {}
