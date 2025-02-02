import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity, UserRoleEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRoleEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
