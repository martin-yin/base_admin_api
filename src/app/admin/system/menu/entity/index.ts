import { BaseRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity('menus')
export class MenuEntity extends BaseRichEntity {
  @Column({
    type: 'int',
    comment: '菜单类型 0: 目录 1: 菜单 2: 按钮',
    default: 1,
    name: 'menu_type',
  })
  menuType: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  path: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  component: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'component_name',
    default: '',
  })
  componentName: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  redirect: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  icon: string;

  @Column({ type: 'int', comment: '是否缓存', default: 0, name: 'keep_alive' })
  keepAlive: number; // 是否缓存，缓存后下次进入会自动加载

  @Column({ type: 'int', comment: '是否隐藏', default: 0 })
  hide: number; // 是否隐藏，隐藏后不在左侧菜单中展示

  @Column({
    type: 'int',
    comment: '打开方式 0 当前页 1 外部链接',
    default: 0,
    name: 'open_type',
  })
  openType: number;

  @Column({ type: 'int', comment: '上级菜单', default: 0, name: 'parent_id' })
  parentId: number; // 上级菜单

  @Column({ type: 'varchar', length: 255, default: '' })
  perms: string; // 授权标识
}
