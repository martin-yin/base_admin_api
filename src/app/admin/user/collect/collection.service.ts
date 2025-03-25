import { BadRequestException, Injectable } from '@nestjs/common';
import { CollectionEntity } from '../entity/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from '../dto/collection.dto';
import { DataBasicService } from '@/shared/services/basic.service';
import { ArticleService } from '../../article/article.service';

@Injectable()
export class CollectionService extends DataBasicService<CollectionEntity> {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectRepository: Repository<CollectionEntity>,
    private readonly articleService: ArticleService,
  ) {
    super(collectRepository);
  }

  /**
   * @description 创建
   * @param collection
   * @returns
   */
  private async createCollection(
    collection: CreateCollectionDto,
  ): Promise<CollectionEntity> {
    const entity = this.collectRepository.create({
      ...collection,
      articles: [],
    });
    return await this.collectRepository.save(entity);
  }

  /**
   * @description 收藏文章
   * @param id
   * @param articleId
   * @returns
   */
  private async collectionArticle(id: number, articleId: number) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new BadRequestException('收藏夹不存在');
    }
    const article = await this.articleService.findOne(articleId);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    collection.articles.push(article);
    return await this.collectRepository.save(collection);
  }

  /**
   * @description 取消收藏文章
   * @param id
   * @param articleId
   * @returns
   */
  private async cancelCollectionArticle(id: number, articleId: number) {
    const collection = await this.findOne(id);
    if (!collection) {
      throw new BadRequestException('收藏夹不存在');
    }
    const article = await this.articleService.findOne(articleId);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    collection.articles = collection.articles.filter(
      (item) => item.id !== article.id,
    );
    return await this.collectRepository.save(collection);
  }

  /**
   * @description 修改
   * @param id
   * @param collection
   * @returns
   */
  private async editCollection(id: number, collection: CreateCollectionDto) {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new BadRequestException('收藏夹不存在');
    }
    entity.name = collection.name;
    entity.isPublic = collection.isPublic;
    return await this.collectRepository.save(entity);
  }
}
