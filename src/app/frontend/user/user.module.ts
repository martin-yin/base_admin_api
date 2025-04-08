import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModule as AdminUserModule } from '@/app/admin/user/user.module';
@Module({
  imports: [AdminUserModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
