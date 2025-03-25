import { BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ArticleEntity } from '../../article/entity/article.entity';

@Entity({
  name: 'collections',
})
export class CollectionEntity extends BasicRichEntity {
  @Column({
    type: 'int',
    comment: '用户ID',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'varchar',
    comment: '收藏夹名称',
  })
  name: string;

  @Column({
    type: 'tinyint',
    comment: '公开还是私密',
  })
  isPublic: number;

  @ManyToMany(() => ArticleEntity)
  @JoinTable({ name: 'collection_articles' })
  articles?: ArticleEntity[];
}
