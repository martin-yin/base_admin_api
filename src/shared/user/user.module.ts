import { Module } from '@nestjs/common';
import {
  UserCollection,
  UserEntity,
  UserFavoriteEntity,
} from './entitys/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordpressUserEntity } from '@/core/database/entitys/wordpress.user.entity';
import { UserAuthModule } from '@/shared/auth/user-auth.module';

@Module({
  imports: [
    UserAuthModule,
    TypeOrmModule.forFeature([UserEntity, UserFavoriteEntity, UserCollection]),
    TypeOrmModule.forFeature([WordpressUserEntity], 'wordpress_db'),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
