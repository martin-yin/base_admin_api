import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/app/admin/user/entity/index.entity';
import {
  CategoryEntity,
  TagEntity,
} from '@/app/admin/article/entity/category.entity';
import {
  ArticleEntity,
  ArticleHistoryEntity,
} from '@/app/admin/article/entity/article.entity';
import { CollectionEntity } from '@/app/admin/user/entity/collection.entity';
import { ConfigService } from '@nestjs/config';

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
          CategoryEntity,
          TagEntity,
          ArticleEntity,
          ArticleHistoryEntity,
          CollectionEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
