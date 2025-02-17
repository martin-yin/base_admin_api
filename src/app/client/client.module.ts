import { Module } from '@nestjs/common';
import { ArticleModule } from '../admin/article/article.module';
import { CategoryModule } from '../admin/article/category/category.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [ArticleModule, CategoryModule],
  controllers: [CategoryController],
  providers: [],
})
export class ClientModule {}
