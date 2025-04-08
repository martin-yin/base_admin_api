import { Module } from '@nestjs/common';
import { CollectGalleryModule } from './collect-gallery/collect-gallery.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserAuthGuard } from '@/shared/auth/guards/user-auth.guard';
import { UserAuthModule } from '@/shared/auth/user-auth.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [
    CollectGalleryModule,
    UserModule,
    UserAuthModule,
    AchievementModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAuthGuard,
    },
  ],
})
export class FrontendModule {}
