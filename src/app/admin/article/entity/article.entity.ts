import { BaseRichEntity, BasicEntity } from '@/shared/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'article_versions',
  comment: '文章版本表',
})
export class ArticleVersionEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '关联文章ID',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'varchar',
    comment: '版本号（语义化版本，如 v1.0.0）',
    name: 'version',
    length: 20,
  })
  version: string;

  @Column({
    type: 'boolean',
    comment: '是否为当前生效版本',
    name: 'is_current',
    default: false,
  })
  isCurrent: boolean;

  @Column({
    type: 'text',
    comment: '版本备注',
    name: 'remark',
    nullable: true,
  })
  remark: string | null;
}

@Entity({
  name: 'articles',
})
export class ArticleEntity extends BaseRichEntity {
  @Column({
    type: 'text',
    comment: '文章标题',
    name: 'title',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '文章简介',
    name: 'desc',
  })
  desc: string;

  @Column({
    type: 'text',
    comment: '文章封面',
    name: 'cover',
  })
  cover: string;

  @Column({
    type: 'text',
    comment: '文章类型 0: macro 宏文章 1: 普通文章 2: 其他',
    name: 'type',
  })
  type: string;

  @Column({
    type: 'text',
    comment: '文章状态 0: 草稿 1: 发布 2: 待审核 3: 已下架',
    name: 'status',
  })
  status: number;

  @Column({
    type: 'int',
    comment: '文章分类',
    name: 'category_id',
  })
  categoryId: number;

  @Column({
    type: 'text',
    comment: '文章轮播图',
    name: 'carousel_images',
  })
  carouselImages: string;

  @Column({
    type: 'text',
    comment: '文章内容',
    name: 'content',
  })
  content: string;

  @Column({
    type: 'int',
    comment: '作者id',
    name: 'auther_id',
  })
  autherId: number;

  @Column({
    type: 'text',
    comment: '文章来源',
    name: 'source',
    default: '',
  })
  source: string;

  @Column({
    type: 'int',
    comment: '浏览量',
    name: 'view_count',
    default: 0,
  })
  viewCount: number;

  @Column({
    type: 'int',
    comment: '收藏数',
    name: 'collect_count',
    default: 0,
  })
  collectCount: number;
}

@Entity({
  name: 'article_tags',
  comment: '文章标签',
})
export class ArticleTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '标签名称',
    name: 'tag_id',
  })
  tagId: number;

  @Column({
    type: 'int',
    comment: '文章id',
    name: 'article_id',
  })
  articleId: number;
}

@Entity({
  name: 'macro_codes',
})
export class MacroCodeEntity extends BasicEntity {
  @Column({
    type: 'int',
    comment: '关联文章ID',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'int',
    comment: '关联版本ID',
    name: 'version_id',
  })
  versionId: number;

  @Column({
    type: 'text',
    comment: '代码内容',
    name: 'code_content',
  })
  codeContent: string;

  @Column({
    type: 'varchar',
    comment: '代码语言',
    name: 'code_language',
    length: 50,
  })
  codeLanguage: string;
}
