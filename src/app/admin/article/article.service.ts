import { DataBasicService } from '@/shared/service/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ArticleEntity } from './entity/article.entity';

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
}
