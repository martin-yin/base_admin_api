import { BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('managements')
export class ManagementEntity extends BasicRichEntity {
  @Column({
    length: 16,
    type: 'varchar',
    unique: true,
    name: 'username',
  })
  username: string;

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

@Entity('management_roles')
export class ManagementRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '用户ID',
    name: 'management_id',
  })
  managementId: number;

  @Column({
    type: 'int',
    comment: '角色ID',
    name: 'role_id',
  })
  roleId: number;
}
