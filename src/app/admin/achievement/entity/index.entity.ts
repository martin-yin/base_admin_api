import { BasicEntity } from '@/core/database/entitys';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'achievements',
})
export class AchievementEntity extends BasicEntity {
  @Column({ comment: '中文名称' })
  name: string;

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

  @Column({ type: 'varchar', length: 500, comment: '图标地址' })
  iconUrl: string;

  @Column({ type: 'text', comment: '成就详情描述' })
  detail: string;

  @Column({ type: 'text', comment: '达成条件说明' })
  unlockCondition: string;

  @Column({ type: 'text', comment: '奖励内容' })
  rewards: string;

  @Column({ comment: '成就点数' })
  points: number;

  @Column({ default: false, comment: '是否账号共享' })
  isAccountShared: boolean;

  @Column({ type: 'enum', enum: ['联盟', '部落', '双方'], comment: '阵营限制' })
  faction: string;

  @Column({ comment: '关联版本号' })
  version: string;

  @Column({ type: 'text', comment: '物品详细数据' })
  itemDetails: string;

  @Column({ name: 'post_uid', comment: '关联帖子UID' })
  postUid: string;

  @Column({ type: 'varchar', length: 500, comment: '帖子链接' })
  postUrl: string;
}
