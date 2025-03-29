import { Module } from '@nestjs/common';
import {
  UserCollection,
  UserEntity,
  UserFavoriteEntity,
} from './entitys/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserFavoriteEntity, UserCollection]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
