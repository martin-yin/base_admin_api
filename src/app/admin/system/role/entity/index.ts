import { BasicRichEntity } from '@/core/database/entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('data_site_roles')
export class RoleEntity extends BasicRichEntity {
  @Column({
    length: 16,
    type: 'varchar',
    name: 'name',
  })
  name: string;
}

@Entity('data_site_role_menus')
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
