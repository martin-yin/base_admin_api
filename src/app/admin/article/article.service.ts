import { DataBasicService } from '@/shared/service/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ArticleEntity, ArticleHistoryEntity } from './entity/article.entity';
import { CreateArticleDto } from './dto/index.dto';
import { CategoryService } from './category/category.service';

@Injectable()
export class ArticleService extends DataBasicService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(ArticleHistoryEntity)
    private readonly articleHistoryRepository: Repository<ArticleHistoryEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,

    private readonly categoryService: CategoryService,
  ) {
    super(articleRepository);
  }

  /**
   * @description 创建文章
   * @param articleData
   * @returns
   */
  async createArticle(articleData: CreateArticleDto): Promise<ArticleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const article = this.articleRepository.create({
        ...articleData,
        tags: await this.categoryService.findTagByIds(articleData.tags),
      });
      const result = await manager.save(ArticleEntity, article);
      await this.saveArticleSnapshot(manager, result, '', '1.0.0');
      return result;
    });
  }

  /**
   *  @description 更新文章
   * @param article
   * @param changelog
   * @param saveType
   */
  private async saveArticleSnapshot(
    manager: EntityManager,
    article: ArticleEntity,
    changelog: string,
    version = '1.0.0',
  ): Promise<void> {
    const snapshot = JSON.stringify({
      title: article.title,
      summary: article.summary,
      cover: article.cover,
      carouselImages: article.carouselImages,
      pluginCategoryId: article.pluginCategoryId,
      categoryId: article.categoryId,
      userId: article.userId,
      content: article.content,
      code: article.code,
      viewCount: article.viewCount,
      tags: article.tags
        ? article.tags.map((tag) => ({
            id: tag.id,
            name: tag.name,
            icon: tag.icon,
          }))
        : [],
    });

    const historyEntry = this.articleHistoryRepository.create({
      snapshot,
      articleId: article.id,
      changelog,
      version,
      saveType: version === '1.0.0' ? 'AUTO_SAVE' : 'MANUAL_SAVE',
    });
    await manager.save(ArticleHistoryEntity, historyEntry);
  }

  async getArticleList() {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('articles')
      .select([
        'articles.id as id',
        'articles.title as title',
        'articles.summary as summary',
        'articles.cover as  cover',
        'articles.viewCount as viewCount',
        'articles.updatedAt as updatedAt',
        'users.nick_name as nickName',
        'JSON_ARRAYAGG(JSON_OBJECT("name", tags.name, "icon", tags.icon)) as tags', // 聚合 tags 的 name 和 icon
      ])
      .leftJoin('users', 'users', 'articles.user_id = users.id')
      .leftJoin(
        'categories',
        'categories',
        'articles.category_id = categories.id',
      )
      .leftJoin('articles.tags', 'tags')
      .where('users.nick_name IS NOT NULL')
      .groupBy('articles.id');

    const result = await queryBuilder.getRawMany();

    // 将 tags 字段从字符串解析为 JSON 对象
    return result.map((item) => ({
      ...item,
    }));
  }
}
