import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { PermissionGuard } from '@/shared/guards/permission.guard';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { AdminJwtStrategy } from '@/shared/service/admin.jwt.strategy';
import { AdminJwtModule } from '@/shared/module/admin.jwt.module';

@Module({
  imports: [
    PassportModule,
    AdminJwtModule,
    AuthModule,
    UserModule,
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
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AdminModule {}
