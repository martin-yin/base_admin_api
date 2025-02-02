import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthContoller } from './auth.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [UserModule, RoleModule],
  controllers: [AuthContoller],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
