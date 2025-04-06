import { BasicEntity } from '@/core/database/entitys';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'data_site_achievements',
})
export class AchievementEntity extends BasicEntity {
  @Column({
    comment: '成就id',
    name: 'achievement_id',
    type: 'int',
  })
  achievementId: number;

  @Column({
    name: 'category_id',
    type: 'int',
    comment: '分类ID',
    default: 0,
  })
  categoryId: number;

  @Column({
    type: 'varchar',
    comment: '版本',
  })
  version: string;

  @Column({
    type: 'text',
    name: 'icon',
    comment: '图标地址',
    nullable: true,
  })
  icon: string;

  @Column({ comment: '名称' })
  name: string;

  @Column({ comment: '成就点数' })
  points: number;

  @Column({
    type: 'text',
    name: 'screenshot',
    comment: '图标地址',
    nullable: true,
  })
  screenshot: string;

  @Column({ type: 'text', comment: '成就详情描述' })
  description: string;

  @Column({
    type: 'varchar',
    default: '无',
    comment: '阵营',
    name: 'camp',
  })
  camp: string;

  @Column({ default: false, comment: '是否账号共享' })
  isshared: boolean;

  @Column({ type: 'text', comment: '达成条件说明' })
  dacheng: string;

  @Column({ type: 'text', comment: '奖励' })
  reward: string;

  @Column({ name: 'post_uid', comment: '关联帖子UID' })
  postUid: string;

  @Column({ type: 'varchar', length: 500, comment: '帖子链接' })
  postUrl: string;
}
