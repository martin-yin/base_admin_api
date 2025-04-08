import { AchievementModule } from '@/app/frontend/achievement/achievement.module';
import { CollectGalleryModule } from '@/app/frontend/collect-gallery/collect-gallery.module';
import { Module } from '@nestjs/common';
import { WowVersionModule } from './wow-version/wow-version.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AchievementModule,
    CollectGalleryModule,
    WowVersionModule,
    UserModule,
  ],
  providers: [],
})
export class SharedModule {}
