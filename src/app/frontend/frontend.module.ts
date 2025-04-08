import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserAuthGuard } from '@/shared/auth/guards/user-auth.guard';
import { SharedModule } from '@/shared/share.module';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAuthGuard,
    },
  ],
})
export class FrontendModule {}
