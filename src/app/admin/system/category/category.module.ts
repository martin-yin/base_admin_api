import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity, CategoryTagEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryTagEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
