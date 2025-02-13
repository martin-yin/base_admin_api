import { MenuEntity } from '@/app/admin/system/menu/entity';
import { RoleEntity, RoleMenuEntity } from '@/app/admin/system/role/entity';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from '@/app/admin/system/management/entity/management.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@/app/admin/system/tag/entity/index.entity';
import { CategoryEntity } from '@/app/admin/system/category/entity';
import {
  ArticleEntity,
  ArticleTagEntity,
  ArticleVersionEntity,
  MacroCodeEntity,
} from '@/app/admin/article/entity/article.entity';
import { UserEntity } from '@/app/admin/user/entity/index.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'base_admin',
      entities: [
        RoleEntity,
        RoleMenuEntity,
        ManagementEntity,
        ManagementRoleEntity,
        MenuEntity,
        TagEntity,
        CategoryEntity,
        ArticleVersionEntity,
        ArticleEntity,
        ArticleTagEntity,
        MacroCodeEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
