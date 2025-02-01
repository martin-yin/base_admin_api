import { BaseEntity } from 'src/shared/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    length: 16,
    type: 'varchar',
    unique: true,
  })
  user_name: string;

  @Column({
    length: 16,
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
  })
  hash_slat: string;
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
  })
  role_id: number;
}

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({
    length: 16,
    type: 'varchar',
  })
  role_name: string;

  @Column({
    type: 'varchar',
  })
  desc: string;
}

@Entity('role_menu')
export class RoleMenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '角色ID',
  })
  role_id: number;

  @Column({
    type: 'int',
    comment: '菜单ID',
  })
  menu_id: number;
}
