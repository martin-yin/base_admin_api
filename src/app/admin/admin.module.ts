import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { PermissionGuard } from '@/shared/guards/permission.guard';
import { AdminJwtModule } from '@/shared/module/admin.jwt.module';
import { AdminJwtStrategy } from '@/shared/service/admin.jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SystemModule } from './system/system.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AdminJwtModule, SystemModule, UploadModule],
  controllers: [],
  providers: [
    AdminJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AdminModule {}
