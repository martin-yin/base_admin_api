import { BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { TagEntity } from './category.entity';

@Entity({
  name: 'articles',
})
export class ArticleEntity extends BasicRichEntity {
  @Column({
    type: 'varchar',
    comment: '文章标题',
    name: 'title',
    length: 255,
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: '文章简介',
    name: 'summary',
    length: 255,
  })
  summary: string;

  @Column({
    type: 'text',
    comment: '文章封面',
    name: 'cover',
  })
  cover: string;

  @Column({ type: 'json', nullable: true })
  carouselImages: string[];

  @Column({
    type: 'int',
    comment: '插件分类id',
    name: 'plugin_category_id',
  })
  pluginCategoryId: number;

  @Column({
    type: 'int',
    comment: '文章分类',
    name: 'category_id',
  })
  categoryId: number;

  @Column({
    type: 'int',
    comment: '作者id',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'text',
    comment: '文章内容',
    name: 'content',
  })
  content: string;

  @Column({
    type: 'text',
    comment: '代码',
    name: 'code',
  })
  code: string;

  @Column({
    type: 'int',
    comment: '浏览量',
    name: 'view_count',
    default: 0,
  })
  viewCount: number;

  @ManyToMany(() => TagEntity)
  @JoinTable({ name: 'article_tags' })
  tags: TagEntity[];
}

@Entity('article_histories')
export class ArticleHistoryEntity extends BasicRichEntity {
  @Column({
    type: 'json',
    comment: '文章快照，包含所有文章相关数据的JSON对象',
  })
  snapshot: any;

  @Column({
    type: 'int',
    comment: '文章id',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'text',
    comment: '更新日志',
    name: 'changelog',
  })
  changelog: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '语义化版本号 (e.g. 2.1.3)',
  })
  version: string;

  @Column({
    type: 'enum',
    enum: ['AUTO_SAVE', 'MANUAL_SAVE'],
    default: 'MANUAL_SAVE',
    comment: '版本保存类型',
  })
  saveType: string;
}
