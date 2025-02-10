import { BaseRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'categorys',
})
export class CategoryEntity extends BaseRichEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '分类名称',
  })
  name: string;

  @Column({
    type: 'longtext',
    comment: '分类图标',
  })
  icon: string;

  @Column({
    type: 'varchar',
    name: 'tag_ids',
    default: '',
    comment: '当前分类关联的tag',
  })
  tagIds: string;
}
