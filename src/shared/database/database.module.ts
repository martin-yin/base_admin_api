import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  AchievementEntity,
  AchievementCategoryEntity,
} from '../achievement/entitys/index.entity';
import { BattlePetEntity } from '../collect-gallery/entitys/battle.pet.entity';
import { MountEntity } from '../collect-gallery/entitys/mounts.entity';
import { ToyEntity } from '../collect-gallery/entitys/toy.entity';
import {
  UserEntity,
  UserCollectionEntity,
  UserFavoriteEntity,
  UserAchievementEntity,
} from '../user/entitys/user.entity';
import { WowVersion } from '../wow-version/entity/index.entity';
import { WordpressUserEntity } from './entitys/wordpress.user.entity';
import { WowheadAchievement } from './entitys/wowhead.achievement.entity';
import { WowheadBattlePet } from './entitys/wowhead.battle.pet.entity';
import { WowheadMount } from './entitys/wowhead.mount.entity';
import { WowheadToy } from './entitys/wowhead.toy.entity';
import { UserCharacterEntity } from '../user/entitys/character.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get('DATABASE_TYPE') as any,
        host: configService.get('DATABASE_HOST') as string,
        port: configService.get('DATABASE_PORT') as number,
        username: configService.get('DATABASE_USER') as string,
        password: configService.get('DATABASE_PWD') as string,
        database: configService.get('DATABASE_DB') as any,
        entities: [
          RoleEntity,
          RoleMenuEntity,
          ManagementEntity,
          ManagementRoleEntity,
          MenuEntity,
          UserEntity,
          UserCollectionEntity,
          UserFavoriteEntity,
          UserAchievementEntity,
          UserCharacterEntity,
          AchievementEntity,
          AchievementCategoryEntity,
          MountEntity,
          ToyEntity,
          BattlePetEntity,
          WowheadMount,
          WowheadAchievement,
          WowheadBattlePet,
          WowheadToy,
          WowVersion,
        ],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'wordpress_db',
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get('DATABASE_TYPE') as any,
        host: configService.get('DATABASE_HOST') as string,
        port: configService.get('DATABASE_PORT') as number,
        username: configService.get('DATABASE_USER') as string,
        password: configService.get('DATABASE_PWD') as string,
        database: configService.get('DATABASE_DB_WORDPRESS') as string,
        entities: [WordpressUserEntity],
        synchronize: false,
      }),
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
