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
import { MountEntity } from '@/app/admin/collect-gallery/entitys/mounts.entity';
import { BattlePetEntity } from '@/app/admin/collect-gallery/entitys/battle.pet.entity';
import { ToyEntity } from '@/app/admin/collect-gallery/entitys/toy.entity';
import { WowheadMount } from './entitys/wowhead.mount.entity';
import { WowheadAchievement } from './entitys/wowhead.achievement.entity';
import { WowheadBattlePet } from './entitys/wowhead.battle.pet.entity';
import { WowheadToy } from './entitys/wowhead.toy.entity';
import { WowVersion } from '@/app/admin/wow-version/entity/index.entity';
import { WordpressUserEntity } from './entitys/wordpress.user.entity';
import { AchievementCategoryEntity, AchievementEntity } from '@/app/admin/achievement/entitys/index.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: configService.get('DATABASE_TYPE') as any,
        host: '10.0.12.2',
        port: 3306,
        username: 'root',
        password: 'we#%WDxoiip1522',
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
        host: '10.0.12.2',
        port: 3306,
        username: 'root',
        password: 'we#%WDxoiip1522',
        database: 'wordpresstest_db',
        entities: [WordpressUserEntity],
        synchronize: false,
      }),
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
