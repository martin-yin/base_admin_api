import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './entity/article.entity';
import { DataBasicService } from '@/shared/service/basic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArticleDto } from './dto/index.dto';

@Injectable()
export class ArticleService extends DataBasicService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {
    super(articleRepository);
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository
      .createQueryBuilder('articles')
      .select([
        'articles.id',
        'articles.title',
        'articles.desc',
        'articles.cover',
        'articles.type',
        'articles.status',
        'articles.categoryId',
        'articles.autherId',
        'articles.source',
        'articles.gameVersion',
        'articles.currentVersion',
      ])
      .leftJoin('category', 'category', 'articles.categoryId = category.id')
      .getMany();
  }

  async createArticle(article: UpdateArticleDto): Promise<ArticleEntity> {
    const articleEntity = new ArticleEntity();
    articleEntity.title = article.title;
    articleEntity.desc = article.desc;
    articleEntity.cover = article.cover;
    articleEntity.type = article.type;
    articleEntity.status = article.status;
    articleEntity.categoryId = article.categoryId;
    articleEntity.carouselImages = article.carouselImages;
    articleEntity.content = article.content;
    articleEntity.autherId = article.autherId;
    articleEntity.source = article.source;
    articleEntity.viewCount = article.viewCount;
    articleEntity.collectCount = article.collectCount;
    articleEntity.currentVersion = article.currentVersion;

    return await this.articleRepository.save(articleEntity);
  }
}
