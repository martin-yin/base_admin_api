import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'wptest_users',
})
export class WordpressUserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  ID: number;

  @Column({
    name: 'user_login',
    type: 'varchar',
    length: 60,
    default: '',
  })
  userLogin: string;

  @Column({
    name: 'user_pass',
    type: 'varchar',
    length: 255,
    default: '',
  })
  userPass: string;

  @Column({
    name: 'user_nicename',
    type: 'varchar',
    length: 50,
    default: '',
  })
  userNicename: string;

  @Column({
    name: 'user_email',
    type: 'varchar',
    length: 100,
    default: '',
  })
  userEmail: string;

  @Column({
    name: 'user_url',
    type: 'varchar',
    length: 100,
    default: '',
  })
  userUrl: string;

  @Column({
    name: 'user_registered',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  userRegistered: Date;

  @Column({
    name: 'user_activation_key',
    type: 'varchar',
    length: 255,
    default: '',
  })
  userActivationKey: string;

  @Column({
    name: 'user_status',
    type: 'int',
    default: 0,
  })
  userStatus: number;

  @Column({
    name: 'display_name',
    type: 'varchar',
    length: 250,
    default: '',
  })
  displayName: string;
}
