import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
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
