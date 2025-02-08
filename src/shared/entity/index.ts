import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '是否删除, 1 是，0： 否',
    default: 0,
    name: 'is_delete',
  })
  isDelete: number;

  @Column({
    type: 'int',
    comment: '状态 1: 启用 0: 停用',
    default: 1,
  })
  status: number;

  @Column({
    type: 'varchar',
    comment: '备注',
    length: 255,
    default: '',
  })
  remark: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({ type: 'int', comment: '排序', default: 0 })
  sort: number;
}
