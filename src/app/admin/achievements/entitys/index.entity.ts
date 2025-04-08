import { BasicEntity, BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'data_site_achievements',
})
export class AchievementEntity extends BasicEntity {}

@Entity({
  name: 'data_site_achievement_categorys',
})
export class AchievementCategoryEntity extends BasicRichEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    comment: '成就分类名称',
  })
  name: string;

  @Column({
    name: 'parent_id',
    type: 'int',
    comment: '上级分类',
    default: 0,
  })
  parentId: number;

  @Column({
    name: 'icon',
    type: 'varchar',
    comment: '成就分类的图片',
    default: '',
  })
  icon: string;
}
