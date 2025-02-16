import { BasicRichEntity } from '@/shared/entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('categories') // 修正表名拼写错误
export class CategoryEntity extends BasicRichEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '分类名称',
    unique: true, // 名称唯一
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '分类图标（存储图标URL）',
    nullable: true, // 允许为空
  })
  icon: string;

  @Column({
    type: 'enum',
    enum: ['PLUGIN', 'GAME_VERSION'],
    default: 'PLUGIN',
    comment: '分类类型',
  })
  type: string; // 使用枚举提高可读性
}

@Entity('tags')
export class TagEntity extends BasicRichEntity {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '标签名称',
    unique: true, // 名称唯一
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '标签图标（存储图标URL）',
    nullable: true, // 允许为空
  })
  icon: string;

  @Column({
    type: 'enum',
    enum: ['SYSTEM', 'CUSTOM'],
    default: 'SYSTEM',
    comment: '标签类型',
  })
  type: string; // 使用枚举提高可读性

  @ManyToOne(() => CategoryEntity) // 建立外键关系
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ name: 'category_id' })
  categoryId: number; // 外键字段
}
