import { BasicEntity } from '@/core/database/entitys';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'data_site_mounts',
})
export class MountEntity extends BasicEntity {
  @Index()
  @Column({
    type: 'int',
    name: 'mount_id',
    comment: '坐骑id',
  })
  mountId: number;

  @Index()
  @Column({
    type: 'varchar',
    comment: '坐骑名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '类别 飞行坐骑 陆地坐骑 水下坐骑',
  })
  category: string;

  @Column({
    type: 'text',
    name: 'icon',
    comment: '图标地址',
    nullable: true,
  })
  icon: string;

  @Column({
    type: 'text',
    name: 'screenshot',
    comment: '图标地址',
    nullable: true,
  })
  screenshot: string;

  @Column({
    type: 'varchar',
    comment: '版本',
  })
  reagents_version: string;

  @Column({
    type: 'varchar',
    default: '无',
    comment: '阵营',
    name: 'reagents_camp',
  })
  reagentsCamp: string;

  // @Column({
  //   type: 'text',
  //   comment: '来源描述',
  // })
  // source: string;

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
