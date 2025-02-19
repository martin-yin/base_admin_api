import { DataBasicService } from '@/shared/service/basic.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ArticleEntity, ArticleHistoryEntity } from './entity/article.entity';
import {
  CreateArticleDto,
  GetArticleDto,
  UpdateArticleDto,
} from './dto/index.dto';
import { CategoryService } from './category/category.service';
import { ConfigService } from '@nestjs/config';

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
    private configService: ConfigService,
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
      const entity = this.articleRepository.create({
        ...articleData,
        tags: await this.categoryService.findTagByIds(articleData.tags),
        viewCount: 0,
        userId: 1,
      });
      const result = await manager.save(ArticleEntity, entity);
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
      updatedAt: article.updatedAt,
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

  async deleteArticle(id: number) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new BadRequestException('文章不存在');
    }
    return await this.articleRepository.save({
      ...entity,
      isDelete: 1,
      status: 0,
    });
  }

  async getArticleList(params?: GetArticleDto) {
    const {
      keyword,
      pluginTypeId,
      categoryId,
      pageNum = 1,
      pageSize = 10,
    } = params;

    try {
      const queryBuilder = this.articleRepository
        .createQueryBuilder('articles')
        .select([
          'articles.id as id',
          'articles.title as title',
          'articles.summary as summary',
          'articles.cover as cover',
          'articles.viewCount as viewCount',
          'articles.updatedAt as updatedAt',
          'users.avatar as avatar',
          'users.nick_name as nickName',
          'JSON_ARRAYAGG(JSON_OBJECT("name", tags.name, "icon", tags.icon)) as tags',
        ])
        .leftJoin('users', 'users', 'articles.user_id = users.id')
        .leftJoin(
          'categories',
          'plugin_categories',
          'articles.plugin_category_id = plugin_categories.id',
        )
        .leftJoin(
          'categories',
          'categories',
          'articles.category_id = categories.id',
        )
        .leftJoin('articles.tags', 'tags')
        .where('users.nick_name IS NOT NULL')
        .groupBy('articles.id');

      // 动态添加查询条件
      if (keyword) {
        console.log('keyword', keyword);
        queryBuilder.andWhere('articles.title LIKE :keyword', {
          keyword: `%${keyword}%`,
        });
      }

      if (pluginTypeId) {
        queryBuilder.andWhere('articles.plugin_category_id = :pluginTypeId', {
          pluginTypeId,
        });
      }

      if (categoryId) {
        queryBuilder.andWhere('articles.category_id = :categoryId', {
          categoryId,
        });
      }

      // 分页处理
      const total = await queryBuilder.getCount();
      const articles = await queryBuilder
        .offset((pageNum - 1) * pageSize)
        .limit(pageSize)
        .getRawMany();

      const domin = this.configService.get('DOMAIN');
      return {
        total,
        list: articles.map((article) => {
          article.cover = domin + article.cover;
          article.tags = article.tags?.map((item) => {
            item.icon = domin + item.icon;
            return item;
          });
          return article;
        }),
      };
    } catch (error) {
      // 错误处理
      console.error('Error fetching article list:', error);
      throw new Error('Failed to fetch article list');
    }
  }

  async updateArticle(id: number, articleData: UpdateArticleDto) {
    return await this.entityManager.transaction(async (manager) => {
      const entity = await this.findOne(id);
      if (!entity) {
        throw new BadRequestException('文章不存在');
      }
      const newEntity = await manager.save(ArticleEntity, {
        ...entity,
        ...articleData,
        tags: await this.categoryService.findTagByIds(articleData.tags),
      });
      const article = await this.getArticleById(id);
      await this.saveArticleSnapshot(
        manager,
        article,
        articleData.changeLog,
        articleData.version,
      );
      return newEntity;
    });
  }

  async getArticleDetail(id: number) {
    const article = await this.getArticleById(id);
    const versionList = await this.articleHistoryRepository.find({
      where: { articleId: id },
      select: ['id', 'version', 'changelog', 'updatedAt'],
      order: { updatedAt: 'DESC' },
    });

    return {
      article,
      currentVersion: versionList[0].version,
      versionList,
    };
  }

  async getArticleDetailByVersion(id: number, articleId: number) {
    const history = await this.articleHistoryRepository.findOne({
      where: { id },
    });
    const versionList = await this.articleHistoryRepository.find({
      where: { articleId },
      select: ['id', 'version', 'changelog', 'updatedAt'],
      order: { updatedAt: 'DESC' },
    });
    const article = history.snapshot;
    return {
      article,
      currentVersion: history.version,
      versionList,
    };
  }

  async getArticleHistory(id: number) {
    const versionList = await this.articleHistoryRepository.find({
      where: { articleId: id },
      select: ['id', 'version', 'changelog', 'updatedAt'],
      order: { version: 'DESC' },
    });
    return versionList;
  }

  private async getArticleById(id: number) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('articles')
      .select([
        'articles.id as id',
        'articles.title as title',
        'articles.summary as summary',
        'articles.cover as cover',
        'articles.carouselImages as carouselImages',
        'articles.content as content',
        'articles.categoryId as categoryId',
        'articles.pluginCategoryId as pluginCategoryId',
        'articles.code as code',
        'articles.viewCount as viewCount',
        'articles.updatedAt as updatedAt',
        'users.nick_name as nickName',
        'users.avatar as avatar',
        'JSON_ARRAYAGG(JSON_OBJECT("id", tags.id, "name", tags.name, "icon", tags.icon)) as tags',
      ])
      .leftJoin('users', 'users', 'articles.user_id = users.id')
      .leftJoin(
        'categories',
        'plugin_categories',
        'articles.plugin_category_id = plugin_categories.id',
      )
      .leftJoin(
        'categories',
        'categories',
        'articles.category_id = categories.id',
      )
      .leftJoin('articles.tags', 'tags')
      .where('articles.id = :id', { id });

    const article = await queryBuilder.getRawOne();
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    const domin = this.configService.get('DOMAIN');

    article.cover = domin + article.cover;
    article.carouselImages = article.carouselImages?.map(
      (item) => domin + item,
    );

    article.tags = article.tags?.map((item) => {
      item.icon = domin + item.icon;
      return item;
    });
    return article;
  }
}
