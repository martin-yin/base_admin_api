import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, CategoryTagEntity } from './entity';
import { TagEntity } from '../tag/entity/index.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, TagEntity, CategoryTagEntity]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
