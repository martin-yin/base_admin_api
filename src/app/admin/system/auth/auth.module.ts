import { Module } from '@nestjs/common';
import { ManagementModule } from '../management/management.module';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { RoleModule } from '../role/role.module';
import { AdminAuthModule } from '@/shared/auth/admin-auth.module';

@Module({
  imports: [ManagementModule, RoleModule, AdminAuthModule],
  controllers: [AuthContoller],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
