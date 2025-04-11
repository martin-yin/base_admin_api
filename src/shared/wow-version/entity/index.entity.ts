import { BasicRichEntity } from '@/shared/database/entitys';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'data_site_wow_versions',
})
export class WowVersion extends BasicRichEntity {
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '版本名称（如：燃烧的远征）',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    comment: '版本号',
  })
  versionNumber: string;

  @Column({
    name: 'icon',
  })
  icon: string;
}
