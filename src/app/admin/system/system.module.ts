import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ManagementModule } from './management/management.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    ManagementModule,
    MenuModule,
    RoleModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
  exports: [AuthModule, ManagementModule, RoleModule],
})
export class SystemModule {}
