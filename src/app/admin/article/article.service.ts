import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleEntity } from './entity/article.entity';
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

  async createArticle(article: UpdateArticleDto): Promise<ArticleEntity> {
    return await this.entityManager.transaction(async (manager) => {});
  }

  async updateArticle(id: number, article: UpdateArticleDto): Promise<void> {
    await this.entityManager.transaction(async (manager) => {});
  }

  async deleteArticle(id: number): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      // const articleEntity = await this.articleRepository.findOne({
      //   where: { id },
      // });
      // if (!articleEntity) {
      //   throw new NotFoundException('文章不存在');
      // }
      // await manager.update(ArticleEntity, { id }, { status: 0 });
    });
  }
}
