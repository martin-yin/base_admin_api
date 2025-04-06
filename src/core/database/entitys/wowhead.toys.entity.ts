import { Entity } from 'typeorm';
import { BasicEntity } from '.';

@Entity({
  name: 'wowhead_toys',
})
export class WowheadToy extends BasicEntity {}
