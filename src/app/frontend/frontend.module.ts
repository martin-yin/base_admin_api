import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserAuthGuard } from '@/shared/auth/guards/user-auth.guard';
import { AchievementModule } from './achievement/achievement.module';
import { UserAuthModule } from '@/shared/auth/user-auth.module';
import { CollectGalleryModule } from './collect-gallery/collect-gallery.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserAuthModule,
    UserModule,
    AchievementModule,
    CollectGalleryModule,
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
