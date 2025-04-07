import { WordpressUserEntity } from '@/core/database/entitys/wordpress.user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '@/app/admin/user/entitys/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordpressUserEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
