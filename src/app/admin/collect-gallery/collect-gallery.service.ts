import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';
import { ToyEntity } from './entitys/toy.entity';
import { AchievementEntity } from './entitys/achievement.entity';
import { MountEntity } from './entitys/mounts.entity';
import { BattlePetEntity } from './entitys/battle.pet.entity';
import { WowVersionService } from '../wow-version/wow-version.service';

@Injectable()
export class CollectGalleryService {
  constructor(
    @InjectRepository(ToyEntity)
    private toyRepository: Repository<ToyEntity>,
    @InjectRepository(BattlePetEntity)
    private battlePetRepository: Repository<BattlePetEntity>,
    @InjectRepository(MountEntity)
    private mountRepository: Repository<MountEntity>,
    @InjectRepository(AchievementEntity)
    private achievementRepository: Repository<AchievementEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,

    private wowVersionService: WowVersionService,
  ) {}

  async getCollectGallery(
    type: string,
    page: number = 1,
    limit: number = 10,
    user_id?: number,
  ) {
    switch (type) {
      case 'toy':
        return await this.getToyList(page, limit, user_id);
      case 'battle-pet':
        return await this.getBattlePetList(page, limit, user_id);
      case 'mount':
        return await this.getMountList(page, limit, user_id);
      default:
        throw new ApiException('不支持的类型', HttpStatus.BAD_REQUEST);
    }
  }

  async getBattlePetList(
    page: number = 1,
    limit: number = 10,
    user_id?: number,
  ) {
    if (user_id) {
      const queryBuilder = this.battlePetRepository
        .createQueryBuilder('battle-pets')
        .select([
          'battle-pets.id as id',
          'battle-pets.name as name',
          'battle-pets.icon_url as icon_url',
          'wow_versions.version as version',
          'battle-pets.faction as faction',
          'battle-pets.post_uid as post_uid',
          'battle-pets.post_link as post_link',
          'CASE WHEN user_collections.id IS NOT NULL THEN true ELSE false END as is_collected',
          'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as is_favorited',
        ])
        .leftJoin(
          'user_collections',
          'user_collections',
          'user_collections.target_id = battle-pets.id AND user_collections.user_id = :userId AND user_collections.type = :type',
          { userId: user_id, type: 'pet' },
        )
        .leftJoin(
          'user_favorites',
          'user_favorites',
          'user_favorites.target_id = battle-pets.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
          { userId: user_id, type: 'pet' },
        )
        .leftJoin(
          'data_site_wow_versions',
          'wow_versions',
          'wow_versions.id = battle-pets.versionId',
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount();

      return {
        list: data,
        total,
        page,
        limit,
      };
    }

    const list = await this.battlePetRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.battlePetRepository.count();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getToyList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.toyRepository
        .createQueryBuilder('toys')
        .select([
          'toys.id as id',
          'toys.name as name',
          'toys.icon as icon',
          'toys.screenshot as screenshot',
          'toys.post_uid as post_uid',
          'toys.post_link as post_link',
          'CASE WHEN user_collections.id IS NOT NULL THEN true ELSE false END as is_collected',
          'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as is_favorited',
        ])
        .leftJoin(
          'data_site_user_collections',
          'user_collections',
          'user_collections.target_id = toys.id AND user_collections.user_id = :userId AND user_collections.type = :type',
          { userId: user_id, type: 'toy' },
        )
        .leftJoin(
          'data_site_user_favorites',
          'user_favorites',
          'user_favorites.target_id = toys.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
          { userId: user_id, type: 'toy' },
        )
        .leftJoin(
          'data_site_wow_versions',
          'wow_versions',
          'wow_versions.id = toys.versionId',
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();
      const total = await queryBuilder.getCount();

      return {
        list: data,
        page,
        total,
        limit,
      };
    }

    // 没有用户的情况
    const queryBuilder = this.toyRepository
      .createQueryBuilder('toys')
      .select([
        'toys.id as id',
        'toys.name as name',
        'toys.icon as icon',
        'toys.screenshot as screenshot',
        'toys.post_uid as post_uid',
        'toys.post_link as post_link',
      ])
      .leftJoin(
        'data_site_wow_versions',
        'wow_versions',
        'wow_versions.id = toys.versionId',
      );

    const list = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    const total = await queryBuilder.getCount();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getMountList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.mountRepository
        .createQueryBuilder('mounts')
        .select([
          'mounts.id as id',
          'mounts.name as name',
          'mounts.icon_url as icon_url',
          'wow_versions.version as version',
          'mounts.faction as faction',
          'mounts.post_uid as post_uid',
          'mounts.post_link as post_link',
          'CASE WHEN user_collections.id IS NOT NULL THEN true ELSE false END as is_collected',
          'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as is_favorited',
        ])
        .leftJoin(
          'user_collections',
          'user_collections',
          'user_collections.target_id = mounts.id AND user_collections.user_id = :userId AND user_collections.type = :type',
          { userId: user_id, type: 'mount' },
        )
        .leftJoin(
          'user_favorites',
          'user_favorites',
          'user_favorites.target_id = mounts.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
          { userId: user_id, type: 'mount' },
        )
        .leftJoin(
          'data_site_wow_versions',
          'wow_versions',
          'wow_versions.id = mounts.versionId',
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount();

      return {
        list: data,
        total,
        page,
        limit,
      };
    }

    const list = await this.mountRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.mountRepository.count();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getCollectGalleryInfo(type: string) {
    // 根据类型获取对应数据的最后更新时间和总数
    let repository: Repository<any>;
    switch (type) {
      case 'battle-pet':
        repository = this.battlePetRepository;
        break;
      case 'toy':
        repository = this.toyRepository;
        break;
      case 'mount':
        repository = this.mountRepository;
        break;
      case 'achievement':
        repository = this.achievementRepository;
        break;
      default:
        throw new ApiException('不支持的类型', HttpStatus.BAD_REQUEST);
    }

    const total = await repository.count();
    const lastUpdated = await repository.find({
      order: {
        updatedAt: 'DESC',
      },
      take: 1,
    });

    return {
      type,
      total,
      lastUpdated: lastUpdated[0]?.updatedAt || '',
    };
  }

  /**
   * @description 收藏进度
   * @param userId
   * @param type
   */
  async getCollectionProcess(type: string, userId?: number) {
    // 如果没有id 则收藏进度全部为 0
    let repository: Repository<any>;
    switch (type) {
      case 'battle-pet':
        repository = this.battlePetRepository;
        break;
      case 'toy':
        repository = this.toyRepository;
        break;
      case 'mount':
        repository = this.mountRepository;
        break;
      default:
        throw new ApiException('不支持的类型', HttpStatus.BAD_REQUEST);
    }

    // 获取版本列表和每个版本的总数
    const versionStats = await repository
      .createQueryBuilder('item')
      .select(['item.version as version', 'COUNT(item.id) as total_count'])
      .groupBy('item.version')
      .orderBy('item.version', 'ASC')
      .getRawMany();

    // 获取总数
    const totalCount = await repository.count();

    // 如果没有用户ID，返回所有进度为0的数据
    if (!userId) {
      return {
        total: {
          collected: 0,
          uncollected: totalCount,
          total: totalCount,
          progress: 0,
        },
        versionCollectiond: versionStats.map((stat) => ({
          version: stat.version,
          collected: 0,
          uncollected: Number(stat.total_count),
          total: Number(stat.total_count),
          progress: 0,
        })),
      };
    }

    // 有用户ID的情况，获取收藏统计
    const totalStats = await repository
      .createQueryBuilder('item')
      .select([
        'COUNT(item.id) as total_count',
        'COUNT(user_collections.id) as collected_count',
      ])
      .leftJoin(
        'user_collections',
        'user_collections',
        'user_collections.target_id = item.id AND user_collections.user_id = :userId AND user_collections.type = :type',
        { userId, type },
      )
      .getRawOne();

    // 按版本分组统计收藏情况
    const versionCollectionStats = await repository
      .createQueryBuilder('item')
      .select([
        'item.version as version',
        'COUNT(item.id) as total_count',
        'COUNT(user_collections.id) as collected_count',
      ])
      .leftJoin(
        'user_collections',
        'user_collections',
        'user_collections.target_id = item.id AND user_collections.user_id = :userId AND user_collections.type = :type',
        { userId, type },
      )
      .groupBy('item.version')
      .orderBy('item.version', 'ASC')
      .getRawMany();

    return {
      total: {
        collected: Number(totalStats.collected_count),
        uncollected:
          Number(totalStats.total_count) - Number(totalStats.collected_count),
        total: Number(totalStats.total_count),
        progress:
          totalStats.total_count > 0
            ? Number(
                (Number(totalStats.collected_count) /
                  Number(totalStats.total_count)) *
                  100,
              ).toFixed(0)
            : 0,
      },
      versionCollectiond: versionCollectionStats.map((stat) => ({
        version: stat.version,
        collected: Number(stat.collected_count),
        uncollected: Number(stat.total_count) - Number(stat.collected_count),
        total: Number(stat.total_count),
        progress:
          stat.total_count > 0
            ? Number(
                (Number(stat.collected_count) / Number(stat.total_count)) * 100,
              ).toFixed(0)
            : 0,
      })),
    };
  }

  async getAchievementList() {
    return await this.achievementRepository.find();
  }

  async sysncData(type: string) {
    return await this.entityManager.transaction(async (transactionManager) => {
      const versionMap = await this.wowVersionService.getVersionMap();

      const syncConfig = {
        toy: {
          table: 'wowhead_toys',
          entity: ToyEntity,
          idField: 'toyId',
          versionField: 'version',
          fieldMappings: {
            name: 'name',
            icon: 'icon_local',
            screenshot: 'screenshot_local',
            camp: 'camp',
            postUid: 'postUid',
            postLink: 'postLink',
          },
        },
        'battle-pet': {
          table: 'wowhead_battle_pets',
          entity: BattlePetEntity,
          idField: 'battlePetId',
          versionField: 'version',
          fieldMappings: {
            name: 'name',
            icon: 'icon_local',
            screenshot: 'screenshot_local',
            camp: 'camp',
            postUid: 'postUid',
            postLink: 'postLink',
          },
        },
        mount: {
          table: 'wowhead_mounts',
          entity: MountEntity,
          idField: 'mountId',
          versionField: 'reagents_version',
          fieldMappings: {
            name: 'name',
            type: 'nav3', // 字段映射
            icon: 'icon_local',
            screenshot: 'screenshot_local',
            camp: 'reagents_camp', // 字段映射
            postUid: 'postUid',
            postLink: 'postLink',
          },
          condition: "TRIM(reagents_version) <> ''",
        },
      };

      const config = syncConfig[type];
      if (!config) {
        throw new ApiException('不支持的类型', HttpStatus.BAD_REQUEST);
      }

      // 构建查询语句
      let query = `SELECT * FROM ${config.table} WHERE exist is NULL`;
      if (config.condition) {
        query += ` AND ${config.condition}`;
      }

      // 查询数据
      const items = await transactionManager.query(query);

      // 同步数据
      for (const item of items) {
        const version = versionMap.get(item[config.versionField].split('.')[0]);

        // 构建数据对象，处理字段映射
        const data = {
          [config.idField]: item.id,
          versionId: version,
          ...Object.entries(config.fieldMappings).reduce(
            (acc, [targetField, sourceField]) => {
              acc[targetField] = item[sourceField as any];
              return acc;
            },
            {},
          ),
        };

        const existingItem = await transactionManager.findOne(config.entity, {
          where: { [config.idField]: item.id },
        });

        if (existingItem) {
          await transactionManager.update(
            config.entity,
            { [config.idField]: item.id },
            data,
          );
        } else {
          const newItem = new config.entity();
          Object.assign(newItem, data);
          await transactionManager.save(config.entity, newItem);
        }
      }

      return success(`数据同步成功`);
    });
  }
}
