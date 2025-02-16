import { BasicRichEntity } from '@/shared/entity';
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

  @ManyToMany(() => TagEntity)
  @JoinTable({ name: 'article_tags' })
  tags: TagEntity[];

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
}

// 历史版本表（全量字段）
@Entity('article_histories')
export class ArticleHistoryEntity extends BasicRichEntity {
  // 完全复制文章表所有字段
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  summary: string;

  @Column({ type: 'text' })
  cover: string;

  @Column({ type: 'json' })
  carouselImages: string[];

  @Column({ name: 'plugin_category_id' })
  pluginCategoryId: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  code: string;

  @Column({ default: 0 })
  viewCount: number;

  // 新增版本控制字段
  @Column({
    type: 'varchar',
    length: 20,
    comment: '语义化版本号 (e.g. 2.1.3)',
  })
  version: string;

  @Column({
    name: 'article_id',
    comment: '关联的主文章ID',
  })
  articleId: number;

  @Column({
    type: 'enum',
    enum: ['AUTO_SAVE', 'MANUAL_SAVE'],
    default: 'MANUAL_SAVE',
  })
  saveType: string; // 版本保存类型
}
