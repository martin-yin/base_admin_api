import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'toys',
})
export class ToyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: 'int',
    name: 'toy_id',
    comment: '玩具id',
  })
  toyId: number;

  @Index()
  @Column({
    type: 'varchar',
    comment: '玩具名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'icon_url',
    comment: '图标地址',
  })
  iconUrl: string;

  @Column({
    type: 'varchar',
    comment: '版本',
  })
  version: string;

  @Column({
    type: 'varchar',
    default: '无',
    comment: '阵营',
  })
  faction: string;

  @Column({
    type: 'text',
    comment: '来源描述',
  })
  source: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'post_uid',
    comment: '帖子UID',
    default: '',
  })
  postUid: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'post_link',
    comment: '帖子链接',
    default: '',
  })
  postLink: string;
}
