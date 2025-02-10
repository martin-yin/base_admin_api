import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, ArticleTagEntity } from './entity/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleTagEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
