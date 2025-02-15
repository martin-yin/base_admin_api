import { BasicRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'collections',
})
export class CollectEntity extends BasicRichEntity {
  @Column({
    type: 'int',
    comment: '用户ID',
  })
  userId: number;

  @Column({
    type: 'varchar',
    comment: '收藏夹名称',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '公开还是私密',
  })
  isPublic: number;
}

@Entity({
  name: 'collection_articles',
})
export class CollectionArticleEntity extends BasicRichEntity {
  @Column({
    type: 'int',
    comment: '收藏夹ID',
  })
  collectionId: number;

  @Column({
    type: 'int',
    comment: '文章ID',
  })
  articleId: number;
}
