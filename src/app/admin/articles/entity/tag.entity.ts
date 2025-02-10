import { BaseRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'tag',
})
export class TagEntity extends BaseRichEntity {
  @Column({
    type: 'varchar',
    length: 50,
    comment: '标签名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    comment: '图标',
    length: 1000,
    default: '',
  })
  icon: string;

  @Column({
    type: 'int',
    comment: '排序',
    default: 0,
    name: 'parent_id',
  })
  parentId: number;
}
