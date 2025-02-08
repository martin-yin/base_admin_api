import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { PermissionGuard } from '@/shared/guards/permission.guard';
import { AdminJwtModule } from '@/shared/module/admin.jwt.module';
import { AdminJwtStrategy } from '@/shared/service/admin.jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './system/auth/auth.module';
import { MenuModule } from './system/menu/menu.module';
import { RoleModule } from './system/role/role.module';
import { ManagementModule } from './system/management/management.module';

@Module({
  imports: [
    AdminJwtModule,
    AuthModule,
    ManagementModule,
    MenuModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    AdminJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
  ],
})
export class AdminModule {}
