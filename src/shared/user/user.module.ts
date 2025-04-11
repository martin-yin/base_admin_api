import { Module } from '@nestjs/common';
import {
  UserAchievementsEntity,
  UserCollectionEntity,
  UserEntity,
  UserFavoriteEntity,
} from './entitys/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordpressUserEntity } from '@/shared/database/entitys/wordpress.user.entity';
import { UserAuthModule } from '../auth/user-auth.module';

@Module({
  imports: [
    UserAuthModule,
    TypeOrmModule.forFeature([UserEntity, UserFavoriteEntity, UserCollectionEntity, UserAchievementsEntity]),
    TypeOrmModule.forFeature([WordpressUserEntity], 'wordpress_db'),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
