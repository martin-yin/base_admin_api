import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, ArticleHistoryEntity } from './entity/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    TypeOrmModule.forFeature([ArticleEntity, ArticleHistoryEntity]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
