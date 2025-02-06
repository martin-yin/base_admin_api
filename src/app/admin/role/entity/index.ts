import { BaseEntity } from '@/shared/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({
    length: 16,
    type: 'varchar',
    name: 'name',
  })
  name: string;
}

@Entity('role_menus')
export class RoleMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '角色ID',
    name: 'role_id',
  })
  roleId: number;

  @Column({
    type: 'int',
    comment: '菜单ID',
    name: 'menu_id',
  })
  menuId: number;
}
