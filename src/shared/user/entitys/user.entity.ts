import { BasicEntity } from '@/core/database/entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'data_site_users',
})
export class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'user_nicename',
    length: 255,
  })
  userNicename: string;

  @Column({
    type: 'varchar',
    name: 'user_login',
    length: 255,
  })
  userLogin: string;

  @Column({
    type: 'varchar',
    name: 'userEmail',
    length: 255,
  })
  userEmail: string;

  @Column({
    type: 'varchar',
    name: 'display_name',
    length: 255,
  })
  displayName: string;

  @Column({
    type: 'text',
    name: 'avatar',
    nullable: true,
  })
  avatar: string;
}

@Entity({
  name: 'data_site_user_collections',
  comment: '用户已经完成的收藏',
})
export class UserCollection extends BasicEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'bigint',
    name: 'target_id',
  })
  targetId: number;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type: string;
}

@Entity('data_site_user_favorites')
export class UserFavoriteEntity extends BasicEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'varchar',
    name: 'type',
    comment: '收藏数据的类型',
  })
  type: string;

  @Column({
    type: 'bigint',
    name: 'target_id',
    comment: '目标的id',
  })
  targetId: number;
}
