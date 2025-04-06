import { Entity } from 'typeorm';
import { BasicEntity } from '.';

@Entity({
  name: 'wowhead_companions',
})
export class WowheadCompanion extends BasicEntity {}
