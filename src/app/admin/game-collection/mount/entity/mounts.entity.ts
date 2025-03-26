import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

Entity('mounts');
export class MountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: 'int',
    length: 100,
    name: 'mount_id',
    comment: '坐骑id',
  })
  mountId: number;

  @Index()
  @Column({
    type: 'string',
    comment: '坐骑名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '类别',
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'icon_url',
    comment: '图标地址',
  })
  iconUrl: string;

  @Column({
    type: 'varchar',
    length: 20,
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
  })
  postUid: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'post_link',
    comment: '帖子链接',
  })
  postLink: string;
}
