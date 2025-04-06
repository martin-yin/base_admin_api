import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({
  name: 'wowhead_toys',
})
export class WowheadToy {
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

  @Column({ nullable: true })
  level: number;

  @Column({ name: 'required_level', nullable: true })
  requiredLevel: number;

  @Column({ nullable: true })
  version: string;

  @Column({ name: 'increase_name', nullable: true })
  increaseName: string;

  @Column({ nullable: true })
  camp: string;

  @Column({ nullable: true })
  inventory: string;

  @Column({ nullable: true })
  source: string;

  @Column({ name: '_type', nullable: true })
  _type: string;

  @Column({ name: 'item_url', nullable: true })
  itemUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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
