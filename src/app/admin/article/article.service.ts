import { Injectable, NotFoundException } from '@nestjs/common';
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
        'articles.id as id',
        'articles.title as title',
        'articles.desc as descb',
        'articles.cover as cover',
        'articles.type as type',
        'articles.status as status',
        'articles.autherId as autherId',
        'articles.source as source',
        'categorys.name as categoryName',
        'categorys.icon as categoryIcon',
        'users.nick_name as nickName',
        'articles.createdAt as createdAt',
        'articles.updatedAt as updatedAt',
        'articles.viewCount as viewCount',
        'articles.collectCount as collectCount',
        'GROUP_CONCAT(tags.name) as tagNames',
      ])
      .leftJoin('categorys', 'categorys', 'articles.categoryId = categorys.id')
      .leftJoin('users', 'users', 'articles.autherId = users.id')
      .leftJoin(
        'article_tags',
        'article_tags',
        'articles.id = article_tags.articleId',
      )
      .leftJoin('tags', 'tags', 'article_tags.tagId = tags.id')
      .groupBy('articles.id')
      .getRawMany();
  }

  private createArticleEntity(article: UpdateArticleDto): ArticleEntity {
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

  private createArticleTagEntities(
    articleId: number,
    tagIds: string,
  ): ArticleTagEntity[] {
    return tagIds.split(',').map((tagId) => {
      const articleTagEntity = new ArticleTagEntity();
      articleTagEntity.tagId = Number(tagId);
      articleTagEntity.articleId = articleId;
      return articleTagEntity;
    });
  }

  private createMacroCodeEntity(
    articleId: number,
    versionId: number,
    codeContent: string,
  ): MacroCodeEntity {
    const macroCodeEntity = new MacroCodeEntity();
    macroCodeEntity.articleId = articleId;
    macroCodeEntity.versionId = versionId;
    macroCodeEntity.codeContent = codeContent;
    macroCodeEntity.codeLanguage = 'javascript';
    return macroCodeEntity;
  }

  private createArticleVersionEntity(
    articleId: number,
    version: string = '1.0.0',
    remark: string = '',
  ): ArticleVersionEntity {
    const articleVersionEntity = new ArticleVersionEntity();
    articleVersionEntity.version = version;
    articleVersionEntity.isCurrent = true;
    articleVersionEntity.articleId = articleId;
    articleVersionEntity.remark = remark;
    return articleVersionEntity;
  }

  async createArticle(article: UpdateArticleDto): Promise<ArticleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const articleEntity = await manager.save(
        this.createArticleEntity(article),
      );
      const articleVersionEntity = await manager.save(
        this.createArticleVersionEntity(articleEntity.id),
      );
      await manager.save(
        this.createArticleTagEntities(articleEntity.id, article.tagIds),
      );
      await manager.save(
        this.createMacroCodeEntity(
          articleEntity.id,
          articleVersionEntity.id,
          article.marcoCode,
        ),
      );
      return articleEntity;
    });
  }

  async updateArticle(id: number, article: UpdateArticleDto): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      const articleEntity = await this.articleRepository.findOne({
        where: { id },
      });
      if (!articleEntity) {
        throw new NotFoundException('文章不存在');
      }

      const articleVersionEntity = await manager.findOne(ArticleVersionEntity, {
        where: { articleId: id, isCurrent: true },
      });
      if (!articleVersionEntity) {
        throw new NotFoundException('文章版本不存在');
      }

      const codeEntity = await manager.findOne(MacroCodeEntity, {
        where: { articleId: id, versionId: articleVersionEntity.id },
      });
      if (!codeEntity) {
        throw new NotFoundException('代码不存在');
      }

      // 更新文章
      await manager.update(ArticleEntity, { id }, { ...article });

      // 创建新版本
      const newArticleVersionEntity = await manager.save(
        this.createArticleVersionEntity(articleEntity.id, '1.0.1'),
      );

      // 更新标签
      await manager.delete(ArticleTagEntity, { articleId: id });
      await manager.save(
        this.createArticleTagEntities(articleEntity.id, article.tagIds),
      );

      // 更新代码
      await manager.update(
        MacroCodeEntity,
        { id: codeEntity.id },
        {
          codeContent: article.marcoCode,
          versionId: newArticleVersionEntity.id,
          codeLanguage: 'javascript',
        },
      );
    });
  }

  async deleteArticle(id: number): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      const articleEntity = await this.articleRepository.findOne({
        where: { id },
      });
      if (!articleEntity) {
        throw new NotFoundException('文章不存在');
      }
      await manager.update(ArticleEntity, { id }, { status: 0 });
    });
  }
}
