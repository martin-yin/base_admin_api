import { BasicEntity, BasicRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

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

  @Column({
    type: 'text',
    comment: '文章轮播图',
    name: 'carousel_images',
  })
  carouselImages: string;

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
    comment: '文章标签',
    name: 'tag_ids',
  })
  tagIds: number;

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
    name: 'code_content',
  })
  codeContent: string;

  @Column({
    type: 'int',
    comment: '浏览量',
    name: 'view_count',
    default: 0,
  })
  viewCount: number;
}

@Entity({
  name: 'article_tags',
})
export class ArticleTagEntity extends BasicEntity {
  @Column({
    type: 'int',
    comment: '文章id',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'int',
    comment: '标签id',
    name: 'tag_id',
  })
  tag_id: number;
}

@Entity({
  name: 'article_versions',
})
export class ArticleVersionEntity extends ArticleEntity {
  @Column({
    type: 'int',
    comment: '文章id',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'boolean',
    comment: '版本号',
    name: 'version',
  })
  isCurrent: boolean;

  @Column({
    type: 'int',
    comment: 'major',
    name: 'major',
  })
  major: number;

  @Column({
    type: 'int',
    comment: 'minor',
    name: 'minor',
  })
  minor: number;

  @Column({
    type: 'int',
    comment: 'patch',
    name: 'patch',
  })
  patch: number;
}
