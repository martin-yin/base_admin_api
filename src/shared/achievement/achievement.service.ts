import { DataBasicService } from '@/shared/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import {
  AchievementCategoryEntity,
  AchievementEntity,
} from './entitys/index.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { WowheadAchievement } from '@/shared/database/entitys/wowhead.achievement.entity';
import { WowVersionService } from '../wow-version/wow-version.service';

@Injectable()
export class AchievementService extends DataBasicService<AchievementEntity> {
  constructor(
    @InjectRepository(AchievementEntity)
    private readonly achievementRepository: Repository<AchievementEntity>,
    @InjectRepository(AchievementCategoryEntity)
    private readonly achievementCategoryRepository: Repository<AchievementCategoryEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private wowVersionService: WowVersionService,
  ) {
    super(achievementRepository);
  }

  /**
   * @description 获取总数和最后更新的信息
   * @returns 
   */
  async getAchievementInfo() {
    const total = await this.achievementRepository.count();
    const lastUpdated = await this.achievementRepository.find({
      order: {
        updatedAt: "DESC",
      },
      take: 1,
    })
    return {
      total,
      lastUpdated: lastUpdated[0].updatedAt,
    }
  }

  async userProcess(userId?: number) {
    const total = await this.achievementRepository.count();
    if (!userId) {
      return {
        total,
        completed: 0,
        progress: 0
      };
    }

    // 获取用户已完成的成就数量
    const userAchievements = await this.entityManager.query(
      `SELECT achievement_ids FROM data_site_user_achievements WHERE user_id = ?`,
      [userId]
    );

    // 计算已完成的成就数量
    let completedCount = 0;
    if (userAchievements.length > 0 && userAchievements[0].achievement_ids) {
      completedCount = userAchievements[0].achievement_ids.split(',').filter(id => id.trim() !== '').length;
    }

    return {
      total,
      completed: completedCount,
      progress: total > 0
        ? Math.round((completedCount / total) * 100)
        : 0
    };
  }

  async getAchievements(page: number = 1, limit: number = 10, categoryId = 0, userId?: number) {
    if (userId) {
      const queryBuilder = this.achievementRepository
        .createQueryBuilder('achievements')
        .select([
          'achievements.id as id',
          'achievements.name as name',
          'achievements.achievement_id as achievementId',
          'achievements.icon as icon',
          'achievements.screenshot as screenshot',
          'achievements.points as points',
          'achievements.camp as camp',
          'achievements.description as description',
          'achievements.isshared as isshared',
          'achievements.dacheng as dacheng',
          'achievements.reward as reward',
          'achievements.postUid as post_uid',
          'achievements.postUrl as post_url',
          'wow_versions.name as version',
          'achievement_categories.name as category',
          "CASE WHEN user_achievements.id IS NOT NULL AND FIND_IN_SET(achievements.achievement_id, user_achievements.achievement_ids) > 0 THEN true ELSE false END as isCompleted",
          'CASE WHEN user_favorites.id IS NOT NULL THEN true ELSE false END as isFavorited',
        ])
        .leftJoin(
          'data_site_user_achievements',
          'user_achievements',
          'user_achievements.user_id = :userId',
          { userId }
        )
        .leftJoin(
          'data_site_user_favorites',
          'user_favorites',
          'user_favorites.target_id = achievements.id AND user_favorites.user_id = :userId AND user_favorites.type = :type',
          { userId, type: 'achievement' }
        )
        .leftJoin(
          'data_site_wow_versions',
          'wow_versions',
          'wow_versions.id = achievements.versionId'
        )
        .leftJoin(
          'data_site_achievement_categorys',
          'achievement_categories',
          'achievement_categories.id = achievements.categoryId'
        );

      // 添加分类过滤条件
      if (categoryId > 0) {
        queryBuilder.where('achievements.categoryId = :categoryId', { categoryId });
      }

      queryBuilder.orderBy('achievements.id', 'DESC');

      queryBuilder.printSql()

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount();

      return {
        list: data.map((item) => {
          return {
            ...item,
            isFavorited: item.isFavorited === 1 ? true : false,
            isCompleted: item.isCompleted === 1 ? true : false,
          };
        }),
        total,
        page,
        limit,
      };
    }

    // 如果没有用户ID，返回不带收藏状态的数据
    const queryBuilder = this.achievementRepository
      .createQueryBuilder('achievements')
      .select([
        'achievements.id as id',
        'achievements.achievementId as achievementId',
        'achievements.name as name',
        'achievements.icon as icon',
        'achievements.screenshot as screenshot',
        'achievements.points as points',
        'achievements.camp as camp',
        'achievements.description as description',
        'achievements.isshared as isshared',
        'achievements.dacheng as dacheng',
        'achievements.reward as reward',
        'achievements.postUid as post_uid',
        'achievements.postUrl as post_url',
        'wow_versions.name as version',
        'achievement_categories.name as category',
      ])
      .leftJoin(
        'data_site_wow_versions',
        'wow_versions',
        'wow_versions.id = achievements.versionId'
      )
      .leftJoin(
        'data_site_achievement_categorys',
        'achievement_categories',
        'achievement_categories.id = achievements.categoryId'
      );

    // 添加分类过滤条件
    if (categoryId > 0) {
      queryBuilder.where('achievements.categoryId = :categoryId', { categoryId });
    }

    queryBuilder.orderBy('achievements.id', 'DESC');

    const data = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    const total = await queryBuilder.getCount();

    console.log(data)
    return {
      list: data.map((item) => {
        return {
          ...item,
          isFavorited: item?.isFavorited === 1 ? true : false,
          isCompleted: item?.isCompleted === 1 ? true : false,
        };
      }),
      total,
      page,
      limit,
    };
  }

  async getAchievementCategory() {
    const categories = await this.achievementCategoryRepository.find();
    const achievementCategoryList = [];

    await Promise.all(
      categories.map(async (category) => {
        const count = await this.achievementRepository.count({
          where: {
            categoryId: category.id,
          }
        });
        achievementCategoryList.push({
          id: category.id,
          name: category.name,
          icon: category.icon,
          parentId: category.parentId,
          count,
        });
      })
    );

    const categoryMap = new Map();
    const rootCategories = [];

    achievementCategoryList.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    achievementCategoryList.forEach(category => {
      const node = categoryMap.get(category.id);
      if (category.parentId === 0) {
        rootCategories.push(node);
      } else {
        const parentNode = categoryMap.get(category.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          rootCategories.push(node);
        }
      }
    });

    const count = await this.achievementRepository.count()

    rootCategories.unshift({
      name: "总览",
      icon: "",
      id: 0,
      parentId: 0,
      count,
    })

    return {
      list: rootCategories
    }
  }

  async processAchievementCategories(achievements: WowheadAchievement[]) {
    // 创建层级映射，使用 uniqueCode 作为键
    const hierarchyMap = new Map<
      string,
      { parent?: string; entity?: AchievementCategoryEntity; name: string }
    >();

    // 第一步：收集所有唯一分类并建立层级关系
    achievements.forEach((row) => {
      // 处理nav3（一级分类）
      if (row.nav3 && !hierarchyMap.has(row.nav3)) {
        hierarchyMap.set(row.nav3, { parent: undefined, name: row.nav3 });
      }

      // 处理nav4（二级分类），使用 nav3:nav4 作为唯一标识符
      if (row.nav4 && row.nav3) {
        const uniqueCode = `${row.nav3}:${row.nav4}`;
        if (!hierarchyMap.has(uniqueCode)) {
          hierarchyMap.set(uniqueCode, { parent: row.nav3, name: row.nav4 });
        }
      }
    });

    // 第二步：按层级顺序处理分类（广度优先）
    const processed = new Set<string>();
    let currentLevel = Array.from(hierarchyMap.keys()).filter(
      (key) => !hierarchyMap.get(key)?.parent,
    );

    while (currentLevel.length > 0) {
      const nextLevel: string[] = [];

      for (const uniqueCode of currentLevel) {
        if (processed.has(uniqueCode)) continue;

        const { parent, name } = hierarchyMap.get(uniqueCode)!;
        let parentId = 0;

        // 获取父级ID
        if (parent) {
          const parentEntity = hierarchyMap.get(parent)?.entity;
          if (!parentEntity) {
            console.warn(
              `Parent ${parent} not found for ${uniqueCode}, skipping`,
            );
            continue;
          }
          parentId = parentEntity.id;
        }

        // 检查是否已存在（通过 uniqueCode 查找）
        let entity = await this.achievementCategoryRepository.findOne({
          where: { uniqueCode },
        });

        // 创建新分类
        if (!entity) {
          entity = this.achievementCategoryRepository.create({
            name,
            uniqueCode,
            parentId,
            icon: '',
          });
          await this.achievementCategoryRepository.save(entity);
        }

        // 更新映射
        hierarchyMap.set(uniqueCode, { parent, name, entity });
        processed.add(uniqueCode);

        // 收集下一层级
        nextLevel.push(
          ...Array.from(hierarchyMap.entries())
            .filter(([_, val]) => val.parent === uniqueCode)
            .map(([code]) => code),
        );
      }

      currentLevel = [...new Set(nextLevel)];
    }
  }

  async categoryMap() {
    const categoryMap = new Map<string, number>();
    const categoryList = await this.achievementCategoryRepository.find();
    categoryList.forEach((category) => {
      categoryMap.set(category.uniqueCode, category.id);
    });
    return categoryMap;
  }

  async sysncData() {
    // 同步成就数据
    return await this.entityManager.transaction(async (transactionManager) => {
      try {
        const versionMap = await this.wowVersionService.getVersionMap();
        const query = 'SELECT * FROM wowhead_achievements WHERE exist IS NULL';
        const items: WowheadAchievement[] =
          await transactionManager.query(query);
        // 处理成就分类
        await this.processAchievementCategories(items);
        const categoryMap = await this.categoryMap();
        // 批量处理成就数据
        const batchSize = 100;
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);

          await Promise.all(
            batch.map(async (element: any) => {
              const version = versionMap.get(element['version'].split('.')[0]);
              // 在 sysncData 方法中修改这部分代码
              let categoryId = 0;
              // 优先使用最具体的分类
              if (element.nav4 && element.nav3) {
                const uniqueCode = `${element.nav3}:${element.nav4}`;
                if (categoryMap.has(uniqueCode)) {
                  categoryId = categoryMap.get(uniqueCode) || 0;
                } else if (categoryMap.has(element.nav3)) {
                  categoryId = categoryMap.get(element.nav3) || 0;
                }
              } else if (element.nav3 && categoryMap.has(element.nav3)) {
                categoryId = categoryMap.get(element.nav3) || 0;
              }

              const achievement = await transactionManager.findOne(
                AchievementEntity,
                {
                  where: {
                    achievementId: element.id,
                  },
                },
              );

              if (!achievement) {
                const achievementEntity = new AchievementEntity();
                achievementEntity.achievementId = element.id;
                achievementEntity.categoryId = categoryId; // 使用找到的分类ID
                achievementEntity.versionId = version || 0;
                achievementEntity.icon = element.icon_local;
                achievementEntity.name = element.name;
                achievementEntity.points = element.points;
                achievementEntity.screenshot = element.screenshot_local;
                achievementEntity.description = element.description;
                achievementEntity.camp = element.camp;
                achievementEntity.isshared = element.isShared;
                achievementEntity.dacheng = element.dacheng;
                achievementEntity.reward = element.reward;
                achievementEntity.postUid = '';
                achievementEntity.postUrl = '';
                await transactionManager.save(
                  AchievementEntity,
                  achievementEntity,
                );
              } else {
                // 更新现有成就
                achievement.categoryId = categoryId;
                achievement.versionId = version || 0;
                achievement.icon = element.icon_local;
                achievement.name = element.name;
                achievement.points = element.points;
                achievement.screenshot = element.screenshot_local;
                achievement.description = element.description;
                achievement.camp = element.camp;
                achievement.isshared = element.isShared;
                achievement.dacheng = element.dacheng;
                achievement.reward = element.reward;
                await transactionManager.save(AchievementEntity, achievement);
              }
            }),
          );
        }

        return {
          success: true,
          message: `成功同步 ${items.length} 条成就数据`,
        };
      } catch (error) {
        console.error('同步成就数据失败:', error);
        throw error; // 抛出错误以触发事务回滚
      }
    });
  }
}
