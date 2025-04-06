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
    name: 'nick_name',
    length: 255,
  })
  nickName: string;

  @Column({
    type: 'varchar',
    name: 'avatar',
    length: 255,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    name: 'openid',
    length: 255,
  })
  openid: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 255,
  })
  phoneNumber: string;

  @Column({
    type: 'int',
    name: 'point',
    nullable: true,
  })
  point: number;

  @Column({
    type: 'timestamp',
    name: 'banned_to_time',
  })
  bannedToTime: Date;

  @Column({
    type: 'varchar',
    name: 'created_by',
  })
  createdBy: string;

  @Column({
    type: 'timestamp',
    name: 'created_time',
  })
  createdTime: Date;

  @Column({
    type: 'timestamp',
    name: 'nickname_last_updated_time',
  })
  nicknameLastUpdatedTime: Date;
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
