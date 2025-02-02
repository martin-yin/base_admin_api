import { BaseEntity } from '@/shared/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    length: 16,
    type: 'varchar',
    unique: true,
    name: 'user_name',
  })
  userName: string;

  @Column({
    length: 64,
    comment: '',
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  avatar: string;

  @Column({
    comment: '密码哈希加盐值',
    name: 'hash_slat',
  })
  hashSlat: string;
}

@Entity('user_role')
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '用户ID',
  })
  user_id: number;

  @Column({
    type: 'int',
    comment: '角色ID',
    name: 'role_id',
  })
  roleId: number;
}
