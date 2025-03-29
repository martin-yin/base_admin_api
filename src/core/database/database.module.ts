import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  UserEntity,
  UserFavoriteEntity,
} from '@/app/admin/user/entitys/index.entity';
import { ConfigService } from '@nestjs/config';
import { MountEntity } from '@/app/admin/game-data/mount/entity/mounts.entity';
import { ToyEntity } from '@/app/admin/game-data/entity/toy.entity';
import { PetEntity } from '@/app/admin/game-data/pet/entity/pet.entity';
import { AchievementEntity } from '@/app/admin/game-data/achievement/entity/index.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get('DATABASE_TYPE') as any,
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PWD'),
        database: 'base_admin',
        entities: [
          RoleEntity,
          RoleMenuEntity,
          ManagementEntity,
          ManagementRoleEntity,
          MenuEntity,
          MountEntity,
          ToyEntity,
          PetEntity,
          UserEntity,
          UserFavoriteEntity,
          AchievementEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
