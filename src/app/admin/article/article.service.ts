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
}
