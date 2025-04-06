import { Entity } from 'typeorm';
import { BasicEntity } from '.';

@Entity({
  name: 'wowhead_achievements',
})
export class WowheadAchievement extends BasicEntity {}
