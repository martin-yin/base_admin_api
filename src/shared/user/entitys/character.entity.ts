import { BasicEntity } from '@/shared/database/entitys';
import { Entity, Column } from 'typeorm';

// 定义副本评分的接口
export interface DungeonScore {
  name: string;
  bestLevel: number;
  bestScore: number;
  Date: string;
}

@Entity('data_site_user_characters')
export class UserCharacterEntity extends BasicEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 255 })
  realm: string;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId: number;

  @Column({ length: 255 })
  class: string;

  @Column({ length: 255 })
  faction: string;

  @Column({ length: 255 })
  race: string;

  @Column()
  level: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  xpPercent: number;

  @Column({ length: 50, nullable: true })
  guild: string;

  @Column({ length: 50, unique: true })
  uniqueID: string;

  @Column({ length: 50 })
  bnetID: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  itemLevel: number;

  @Column()
  achievementPoints: number;

  @Column()
  mythicScore: number;

  @Column({ type: 'json', nullable: true })
  dungeonScores: DungeonScore[];
}
