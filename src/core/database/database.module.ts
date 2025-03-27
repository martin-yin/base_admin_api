import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/app/admin/user/entitys/index.entity';
import { ConfigService } from '@nestjs/config';
import { MountEntity } from '@/app/admin/game-collection/mount/entity/mounts.entity';
import { ToyEntity } from '@/app/admin/game-collection/toy/entity/toy.entity';
import { PetEntity } from '@/app/admin/game-collection/pet/entity/pet.entity';

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
          UserEntity,
          MountEntity,
          ToyEntity,
          PetEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
