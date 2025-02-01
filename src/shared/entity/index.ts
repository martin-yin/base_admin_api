import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    comment: '是否删除, 1 启动，0： 停用',
    default: 1,
    name: 'is_delete',
  })
  isDelete: number;

  @Column({
    type: 'int',
    comment: '状态 1: 启用 0: 停用',
    default: 1,
  })
  status: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
