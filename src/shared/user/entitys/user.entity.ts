import { BasicEntity } from '@/shared/database/entitys';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'data_site_users',
})
export class UserEntity extends BasicEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'user_nicename',
    length: 255,
  })
  userNicename: string;

  @Column({
    type: 'varchar',
    name: 'battle_net_id',
    length: 255,
  })
  battleNetId: string;

  @Column({
    type: 'varchar',
    name: 'display_name',
    length: 255,
  })
  displayName: string;

  @Column({
    type: 'text',
    name: 'avatar',
    nullable: true,
  })
  avatar: string;
}

@Entity({
  name: 'data_site_user_collections',
  comment: '用户已经完成的收藏',
})
export class UserCollectionEntity extends BasicEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'text',
    name: 'collection_ids',
    comment: '收藏ids',
  })
  collectionIds: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type: string;
}

@Entity({
  name: 'data_site_user_achievements',
  comment: '用户已经完成的成就表',
})
export class UserAchievementEntity extends BasicEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
    unique: true,
  })
  userId: number;

  @Column({
    type: 'text',
    name: 'achievement_ids',
  })
  achievementIds: string;
}

@Entity('data_site_user_favorites')
export class UserFavoriteEntity extends BasicEntity {
  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  @Column({
    type: 'varchar',
    name: 'type',
    comment: '收藏数据的类型',
  })
  type: string;

  @Column({
    type: 'bigint',
    name: 'target_id',
    comment: '目标的id',
  })
  targetId: number;
}
