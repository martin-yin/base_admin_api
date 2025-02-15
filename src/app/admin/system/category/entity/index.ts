import { BasicRichEntity } from '@/shared/entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'categorys',
})
export class CategoryEntity extends BasicRichEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '分类名称',
  })
  name: string;

  @Column({
    type: 'longtext',
    comment: '分类图标',
  })
  icon: string;

  @Column({
    type: 'int',
    comment: '分类类型 0: 插件 1: 游戏版本',
    default: 0,
  })
  type: number;
}

@Entity({
  name: 'category_tags',
})
export class CategoryTagEntity extends BasicRichEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名称',
  })
  name: string;

  @Column({
    type: 'longtext',
    comment: '分类图标',
  })
  icon: string;

  @Column({
    type: 'int',
    comment: '标签类型 0: 系统标签 1: 自定义标签',
    default: 0,
  })
  type: number;

  @Column({
    type: 'int',
    comment: '所属分类',
  })
  categoryId: number;
}
