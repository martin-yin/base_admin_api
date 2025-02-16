import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, ArticleHistoryEntity } from './entity/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([ArticleEntity, ArticleHistoryEntity]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
