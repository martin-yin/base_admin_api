import { Module } from '@nestjs/common';
import { ManagementModule } from '../management/management.module';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [ManagementModule, RoleModule],
  controllers: [AuthContoller],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
