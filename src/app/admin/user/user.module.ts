import { Module } from '@nestjs/common';
import { UserEntity, UserFavoriteEntity } from './entitys/index.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFavoriteEntity])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
