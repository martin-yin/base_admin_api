import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';
import { ToyEntity } from './entity/toy.entity';
import { AchievementEntity } from './entity/achievement.entity';
import { MountEntity } from './entity/mounts.entity';
import { PetEntity } from './entity/pet.entity';

@Injectable()
export class GameDataService {
  constructor(
    @InjectRepository(ToyEntity)
    private toyRepository: Repository<ToyEntity>,
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,
    @InjectRepository(MountEntity)
    private mountRepository: Repository<MountEntity>,
    @InjectRepository(AchievementEntity)
    private achievementRepository: Repository<AchievementEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  // 统一处理所有游戏数据的创建/更新
  async createOrUpdateGameData<T extends { id: number }>(
    entityClass: new () => T,
    items: T[],
    idField: string,
  ) {
    try {
      return await this.entityManager.transaction(
        async (transactionManager) => {
          for (const item of items) {
            const existingItem = await transactionManager.findOne(entityClass, {
              where: { [idField]: item[idField] } as any,
            });

            if (existingItem) {
              await transactionManager.update(
                entityClass,
                { [idField]: item[idField] },
                item as any,
              );
            } else {
              const newItem = new entityClass();
              Object.assign(newItem, item);
              await transactionManager.save(entityClass, newItem);
            }
          }
          return success('处理成功');
        },
      );
    } catch (error) {
      console.error(`处理${entityClass.name}数据错误:`, error);
      throw new ApiException(
        `处理${entityClass.name}数据失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 特定类型数据的处理方法
  async createToys(toys: ToyEntity[]) {
    return this.createOrUpdateGameData(ToyEntity, toys, 'toyId');
  }

  async createPets(pets: PetEntity[]) {
    return this.createOrUpdateGameData(PetEntity, pets, 'petId');
  }

  async createMounts(mounts: MountEntity[]) {
    return this.createOrUpdateGameData(MountEntity, mounts, 'mountId');
  }

  async createAchievements(achievements: AchievementEntity[]) {
    return this.createOrUpdateGameData(
      AchievementEntity,
      achievements,
      'achievementId',
    );
  }

  async getPetList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.petRepository
        .createQueryBuilder('pets')
        .select([
          'pets.id as id',
          'pets.name as name',
          'pets.icon_url as icon_url',
          'pets.version as version',
          'pets.faction as faction',
          'pets.post_uid as post_uid',
          'pets.post_link as post_link',
          'CASE WHEN user_collections.id IS NOT NULL THEN true ELSE false END as is_collected',
          'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as is_favorited',
        ])
        .leftJoin(
          'user_collections',
          'user_collections',
          'user_collections.target_id = pets.id AND user_collections.user_id = :userId AND user_collections.type = :type',
          { userId: user_id, type: 'pet' },
        )
        .leftJoin(
          'user_favorites',
          'user_favorites',
          'user_favorites.target_id = pets.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
          { userId: user_id, type: 'pet' },
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

    return this.petRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getToyList(page: number = 1, limit: number = 10, user_id?: number) {
    const queryBuilder = this.toyRepository
      .createQueryBuilder('toys')
      .select([
        'toys.id as id',
        'toys.name as name',
        'toys.icon_url as icon_url',
        'toys.version as version',
        'toys.faction as faction',
        'toys.post_uid as post_uid',
        'toys.post_link as post_link',
        'CASE WHEN user_collections.id IS NOT NULL THEN true ELSE false END as is_collected',
        'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as is_favorited',
      ])
      .leftJoin(
        'user_collections',
        'user_collections',
        'user_collections.target_id = toys.id AND user_collections.user_id = :userId AND user_collections.type = :type',
        { userId: user_id, type: 'toy' },
      )
      .leftJoin(
        'user_favorites',
        'user_favorites',
        'user_favorites.target_id = toys.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
        { userId: user_id, type: 'toy' },
      );

    if (user_id) {
      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();
      const total = await queryBuilder.getCount(); // 获取总记录数

      return {
        list: data,
        page,
        total,
        limit,
      };
    }

    return this.toyRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getMountList(page: number = 1, limit: number = 10, user_id?: number) {
    const queryBuilder = this.mountRepository
      .createQueryBuilder('mounts')
      .select([
        'mounts.id as id',
        'mounts.name as name',
        'mounts.icon_url as icon_url',
        'mounts.version as version',
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
      );

    if (user_id) {
      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount(); // 获取总记录数

      return {
        list: data,
        total,
        page,
        limit,
      };
    }

    return this.mountRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  /**
   * @description 收藏进度
   * @param userId
   * @param type
   */
  async getCollectionProcess(userId: number, type: string = 'pet') {
    // 根据类型选择对应的repository
    let repository: Repository<any>;
    switch (type) {
      case 'pet':
        repository = this.petRepository;
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

    // 获取总数量统计
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

    // 按版本分组统计
    const versionStats = await repository
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
            ? Math.round(
                (Number(totalStats.collected_count) /
                  Number(totalStats.total_count)) *
                  100,
              )
            : 0,
      },
      versionCollectiond: versionStats.map((stat) => ({
        version: stat.version,
        collected: Number(stat.collected_count),
        uncollected: Number(stat.total_count) - Number(stat.collected_count),
        total: Number(stat.total_count),
        progress:
          stat.total_count > 0
            ? Math.round(
                (Number(stat.collected_count) / Number(stat.total_count)) * 100,
              )
            : 0,
      })),
    };
  }

  async getAchievementList() {
    return await this.achievementRepository.find();
  }

  // 添加批量查询方法
  // async findAllGameData() {
  //   const [toys, pets, mounts, achievements] = await Promise.all([
  //     this.toyRepository.find(),
  //     this.petRepository.find(),
  //     this.mountRepository.find(),
  //     this.achievementRepository.find(),
  //   ]);

  //   return {
  //     toys,
  //     pets,
  //     mounts,
  //     achievements,
  //   };
  // }
}
