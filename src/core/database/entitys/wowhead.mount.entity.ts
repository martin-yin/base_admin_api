import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'wowhead_mounts',
})
export class WowheadMount {
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

  @Column({ name: 'mount_id' })
  mountId: number;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'icon_local', nullable: true })
  iconLocal: string;

  @Column({ nullable: true })
  version: string;

  @Column({ name: 'increase_name', nullable: true })
  increaseName: string;

  @Column({ name: 'item_url', nullable: true })
  itemUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  trivia: string;

  @Column({ name: 'update_time', type: 'timestamp', nullable: true })
  updateTime: Date;

  @Column({ type: 'text', nullable: true })
  tooltip: string;

  @Column({ nullable: true })
  screenshot: string;

  @Column({ name: 'screenshot_local', nullable: true })
  screenshotLocal: string;

  @Column({ name: 'reagents_version', nullable: true })
  reagentsVersion: string;

  @Column({ name: 'reagents_increase_name', nullable: true })
  reagentsIncreaseName: string;

  @Column({ name: 'reagents_description', type: 'text', nullable: true })
  reagentsDescription: string;

  @Column({ name: 'reagents_trivia', type: 'text', nullable: true })
  reagentsTrivia: string;

  @Column({ name: 'reagents_camp', nullable: true })
  reagentsCamp: string;
}
