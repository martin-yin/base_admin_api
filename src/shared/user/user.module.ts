import { Module } from '@nestjs/common';
import {
  UserAchievementEntity,
  UserCollectionEntity,
  UserEntity,
  UserFavoriteEntity,
} from './entitys/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordpressUserEntity } from '@/shared/database/entitys/wordpress.user.entity';
import { UserAuthModule } from '../auth/user-auth.module';
import { UserCharacterEntity } from './entitys/character.entity';

@Module({
  imports: [
    UserAuthModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserFavoriteEntity,
      UserCollectionEntity,
      UserAchievementEntity,
      UserCharacterEntity,
    ]),
    TypeOrmModule.forFeature([WordpressUserEntity], 'wordpress_db'),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
