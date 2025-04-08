import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({
  name: 'wowhead_achievements',
  comment: 'wowhead成就',
})
export class WowheadAchievement {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  nav1: string;

  @Column({ nullable: true })
  nav2: string;

  @Column({ nullable: true })
  nav3: string;

  @Column({ nullable: true })
  nav4: string;

  @Column()
  name: string;

  @Column({ name: 'name_en', nullable: true })
  nameEn: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'icon_local', nullable: true })
  iconLocal: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  dacheng: string;

  @Column({ type: 'text', nullable: true })
  reward: string;

  @Column({ nullable: true })
  points: number;

  @Column({ name: 'isshared', nullable: true })
  isShared: boolean;

  @Column({ nullable: true })
  camp: string;

  @Column({ nullable: true })
  version: string;

  @Column({ name: 'increase_name', nullable: true })
  increaseName: string;

  @Column({ name: 'item_url', nullable: true })
  itemUrl: string;

  @Column({ type: 'text', nullable: true })
  trivia: string;

  @Column({ name: 'update_time', type: 'varchar', nullable: true })
  updateTime: string;

  @Column({ type: 'text', nullable: true })
  tooltip: string;

  @Column({ nullable: true })
  screenshot: string;

  @Column({ name: 'screenshot_local', nullable: true })
  screenshotLocal: string;

  @Column({ nullable: true })
  exist: boolean;
}
