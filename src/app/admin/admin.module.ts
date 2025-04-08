import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { UploadModule } from './upload/upload.module';
import { APP_GUARD } from '@nestjs/core';
import { AdminAuthModule } from '@/shared/auth/admin-auth.module';
import { AdminJwtAuthGuard } from '@/shared/auth/guards/admin-auth.guard';
import { PermissionGuard } from '@/shared/auth/guards/permission.guard';
import { SharedModule } from '@/shared/share.module';
// import { CollectGalleryModule } from './collect-gallery/collect-gallery.module';
// import { WowVersionModule } from './wow-version/wow-version.module';

@Module({
  imports: [
    AdminAuthModule,
    SystemModule,
    UploadModule,
    SharedModule,
    // CollectGalleryModule,
    // WowVersionModule,
  ],
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
