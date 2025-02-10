import { Injectable } from '@nestjs/common';
import {
  ArticleEntity,
  ArticleTagEntity,
  ArticleVersionEntity,
  MacroCodeEntity,
} from './entity/article.entity';
import { DataBasicService } from '@/shared/service/basic.service';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UpdateArticleDto } from './dto/index.dto';

@Injectable()
export class ArticleService extends DataBasicService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
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

  async createArticleEntity(article: UpdateArticleDto): Promise<ArticleEntity> {
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
    return articleEntity;
  }

  async createArticleTagEntitys(
    articleId: number,
    tagIds: string,
  ): Promise<ArticleTagEntity[]> {
    const articleTagEntities: ArticleTagEntity[] = [];
    tagIds.split(',').forEach(async (tagId) => {
      const articleTagEntity = new ArticleTagEntity();
      articleTagEntity.tagId = Number(tagId);
      articleTagEntity.articleId = articleId;
      articleTagEntities.push(articleTagEntity);
    });
    return articleTagEntities;
  }

  async createMarcoCodeEntity(
    articleId: number,
    macroCodes: string,
  ): Promise<MacroCodeEntity> {
    const macroCodeEntity = new MacroCodeEntity();
    macroCodeEntity.articleId = articleId;
    macroCodeEntity.versionId = 1;
    macroCodeEntity.codeContent = macroCodes;
    macroCodeEntity.codeLanguage = 'javascript';
    return macroCodeEntity;
  }

  async createArticleVersionEntity(): Promise<ArticleVersionEntity> {
    return null;
  }

  async createArticle(article: UpdateArticleDto): Promise<ArticleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const articleEntity = await manager.save(
        await this.createArticleEntity(article),
      );
      // 标签
      await manager.save(
        await this.createArticleTagEntitys(articleEntity.id, article.tagIds),
      );
      // 代码
      await manager.save(
        await this.createMarcoCodeEntity(articleEntity.id, article.macroCode),
      );
      // 版本

      return articleEntity;
    });
  }
}
