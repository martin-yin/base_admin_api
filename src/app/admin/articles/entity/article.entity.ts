import { BaseRichEntity, BasicEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'article',
})
export class ArticelEntity extends BaseRichEntity {
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
    comment: '文章轮播图',
    name: 'carousel',
  })
  carousel: string;

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
  })
  source: string;

  @Column({
    type: 'text',
    comment: '文章标签',
    name: 'tag_ids',
  })
  tagIds: string;

  @Column({
    type: 'int',
    comment: '游戏版本',
    name: 'game_version',
  })
  gameVersion: number;

  @Column({
    type: 'int',
    comment: '浏览量',
    name: 'view_count',
  })
  viewCount: number;

  @Column({
    type: 'int',
    comment: '收藏数',
    name: 'collect_count',
  })
  collectCount: number;

  @Column({
    type: 'int',
    comment: '版本号',
    name: 'current_version',
  })
  currentVersion: string;
}

@Entity({
  name: 'macro_code',
})
export class MacroCodeEntity extends BasicEntity {
  @Column({
    type: 'int',
    comment: '文章id',
    name: 'article_id',
  })
  articleId: number;

  @Column({
    type: 'text',
    comment: '代码内容',
    name: 'code_content',
  })
  codeContent: string;

  @Column({
    type: 'text',
    comment: '版本号',
  })
  version: string;

  @Column({
    type: 'text',
    comment: '更新日志',
    name: 'change_log',
  })
  changeLog: string;
}
