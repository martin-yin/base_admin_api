import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';

// import { PermissionGuard } from '@/shared/auth/guards/permission.guard';
import { AdminAuthModule } from '@/shared/auth/admin-auth.module';
import { AdminJwtAuthGuard } from '@/shared/auth/guards/admin-auth.guard';
import { PermissionGuard } from '@/shared/auth/guards/permission.guard';

@Module({
  imports: [AdminAuthModule, SystemModule, UploadModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AdminModule {}
