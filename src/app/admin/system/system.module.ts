import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ManagementModule } from './management/management.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [AuthModule, ManagementModule, MenuModule, RoleModule],
  controllers: [],
  providers: [],
  exports: [AuthModule, ManagementModule, RoleModule],
})
export class SystemModule {}
