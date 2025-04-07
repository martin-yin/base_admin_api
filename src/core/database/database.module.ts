import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  UserCollection,
  UserEntity,
  UserFavoriteEntity,
} from '@/app/admin/user/entitys/user.entity';
import { ConfigService } from '@nestjs/config';
import { AchievementEntity } from '@/app/admin/collect-gallery/entity/achievement.entity';
import { MountEntity } from '@/app/admin/collect-gallery/entity/mounts.entity';
import { BattlePetEntity } from '@/app/admin/collect-gallery/entity/battle.pet.entity';
import { ToyEntity } from '@/app/admin/collect-gallery/entity/toy.entity';
import { WowheadMount } from './entitys/wowhead.mount.entity';
import { WowheadAchievement } from './entitys/wowhead.achievement.entity';
import { WowheadBattlePet } from './entitys/wowhead.battle.pet.entity';
import { WowheadToy } from './entitys/wowhead.toy.entity';
import { WowVersion } from '@/app/admin/wow-version/entity/index.entity';
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
        database: configService.get('DATABASE_DB') as any,
        entities: [
          RoleEntity,
          RoleMenuEntity,
          ManagementEntity,
          ManagementRoleEntity,
          MenuEntity,
          UserEntity,
          UserCollection,
          UserFavoriteEntity,
          AchievementEntity,
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
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
