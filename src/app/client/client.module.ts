import { Module } from '@nestjs/common';
import { ArticleModule } from '../admin/article/article.module';
import { CategoryModule } from '../admin/article/category/category.module';
import { CategoryController } from './category.controller';
import { ArticleController } from './article.controller';

@Module({
  imports: [ArticleModule, CategoryModule],
  controllers: [ArticleController, CategoryController],
  providers: [],
})
export class ClientModule {}
