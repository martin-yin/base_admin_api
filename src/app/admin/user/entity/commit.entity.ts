import { BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'article_comments' })
export class CommentEntity extends BasicRichEntity {
  @Column({ comment: '文章ID' })
  @Index('IDX_ARTICLE_ID')
  articleId: number;

  @Column({ comment: '评论作者ID' })
  @Index('IDX_USER_ID')
  userId: number;

  @Column({ type: 'text', comment: '评论内容' })
  content: string;

  @Column({
    type: 'int',
    comment: '父级评论ID',
    default: null,
    nullable: true,
  })
  @Index('IDX_PARENT_ID')
  parentId: number | null;

  @Column({
    type: 'int',
    comment: '被回复用户ID',
    default: null,
    nullable: true,
  })
  replyToUserId: number | null;
}
