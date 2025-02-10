export class UpdateArticleDto {
  title: string;
  desc: string;
  cover: string;
  type: string;
  status: number;
  categoryId: number;
  carouselImages: string;
  content: string;
  autherId: number;
  source: string;
  tagIds: string;
  gameVersion: number;
  viewCount: number;
  collectCount: number;
  currentVersion: string;
}

//  @Column({
//     type: 'text',
//     comment: '文章标题',
//     name: 'title',
//   })
//   title: string;

//   @Column({
//     type: 'text',
//     comment: '文章简介',
//     name: 'desc',
//   })
//   desc: string;

//   @Column({
//     type: 'text',
//     comment: '文章封面',
//     name: 'cover',
//   })
//   cover: string;

//   @Column({
//     type: 'text',
//     comment: '文章类型 0: macro 宏文章 1: 普通文章 2: 其他',
//     name: 'type',
//   })
//   type: string;

//   @Column({
//     type: 'text',
//     comment: '文章状态 0: 草稿 1: 发布 2: 待审核 3: 已下架',
//     name: 'status',
//   })
//   status: number;

//   @Column({
//     type: 'int',
//     comment: '文章分类',
//     name: 'category_id',
//   })
//   categoryId: number;

//   @Column({
//     type: 'text',
//     comment: '文章轮播图',
//     name: 'carousel',
//   })
//   carousel: string;

//   @Column({
//     type: 'text',
//     comment: '文章内容',
//     name: 'content',
//   })
//   content: string;

//   @Column({
//     type: 'int',
//     comment: '作者id',
//     name: 'auther_id',
//   })
//   autherId: number;

//   @Column({
//     type: 'text',
//     comment: '文章来源',
//     name: 'source',
//   })
//   source: string;

//   @Column({
//     type: 'text',
//     comment: '文章标签',
//     name: 'tag_ids',
//   })
//   tagIds: string;

//   @Column({
//     type: 'int',
//     comment: '游戏版本',
//     name: 'game_version',
//   })
//   gameVersion: number;

//   @Column({
//     type: 'int',
//     comment: '浏览量',
//     name: 'view_count',
//   })
//   viewCount: number;

//   @Column({
//     type: 'int',
//     comment: '收藏数',
//     name: 'collect_count',
//   })
//   collectCount: number;

//   @Column({
//     type: 'int',
//     comment: '版本号',
//     name: 'current_version',
//   })
//   currentVersion: string;
