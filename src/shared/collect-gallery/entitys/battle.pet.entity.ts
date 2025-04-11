import { BasicEntity } from '@/shared/database/entitys';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'data_site_battle_pets',
})
export class BattlePetEntity extends BasicEntity {
  @Index()
  @Column({
    type: 'int',
    name: 'battle_pet_id',
    comment: '宠物id',
  })
  battlePetId: number;

  @Index()
  @Column({
    type: 'varchar',
    comment: '宠物名称',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '版本',
  })
  versionId: number;

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
    default: '无',
    comment: '阵营',
    name: 'camp',
  })
  camp: string;

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
