import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import {
  AchievementCategoryEntity,
  AchievementEntity,
} from './entitys/index.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { WowheadAchievement } from '@/core/database/entitys/wowhead.achievement.entity';
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

  async processAchievementCategories(achievements: WowheadAchievement[]) {
    // 创建层级映射
    const hierarchyMap = new Map<
      string,
      { parent?: string; entity?: AchievementCategoryEntity }
    >();

    // 第一步：收集所有唯一分类并建立层级关系
    achievements.forEach((row) => {
      // 处理nav2（顶级分类）
      if (row.nav2 && !hierarchyMap.has(row.nav2)) {
        hierarchyMap.set(row.nav2, { parent: undefined });
      }

      // 处理nav3（二级分类）
      if (row.nav3 && !hierarchyMap.has(row.nav3)) {
        hierarchyMap.set(row.nav3, { parent: row.nav2 });
      }

      // 处理nav4（三级分类）
      if (row.nav4 && !hierarchyMap.has(row.nav4)) {
        hierarchyMap.set(row.nav4, { parent: row.nav3 });
      }
    });

    // 第二步：按层级顺序处理分类（广度优先）
    const processed = new Set<string>();
    let currentLevel = Array.from(hierarchyMap.keys()).filter(
      (key) => !hierarchyMap.get(key)?.parent,
    );

    while (currentLevel.length > 0) {
      const nextLevel: string[] = [];

      for (const categoryName of currentLevel) {
        if (processed.has(categoryName)) continue;

        const { parent } = hierarchyMap.get(categoryName)!;
        let parentId = 0;

        // 获取父级ID
        if (parent) {
          const parentEntity = hierarchyMap.get(parent)?.entity;
          if (!parentEntity) {
            console.warn(
              `Parent ${parent} not found for ${categoryName}, skipping`,
            );
            continue;
          }
          parentId = parentEntity.id;
        }

        // 检查是否已存在
        let entity = await this.achievementCategoryRepository.findOne({
          where: { name: categoryName },
        });

        // 创建新分类
        if (!entity) {
          entity = this.achievementCategoryRepository.create({
            name: categoryName,
            parentId,
            icon: '',
          });
          await this.achievementCategoryRepository.save(entity);
        }

        // 更新映射
        hierarchyMap.set(categoryName, { parent, entity });
        processed.add(categoryName);

        // 收集下一层级
        nextLevel.push(
          ...Array.from(hierarchyMap.entries())
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, val]) => val.parent === categoryName)
            .map(([name]) => name),
        );
      }

      currentLevel = [...new Set(nextLevel)];
    }
  }

  // 取消注释并修改categoryMap方法
  async categoryMap() {
    const categoryMap = new Map<string, number>();
    const categoryList = await this.achievementCategoryRepository.find();
    categoryList.forEach((category) => {
      categoryMap.set(category.name, category.id);
    });
    return categoryMap;
  }

  async sysncData() {
    // 同步成就数据
    return await this.entityManager.transaction(async (transactionManager) => {
      try {
        const versionMap = await this.wowVersionService.getVersionMap();
        // 获取分类映射
        const categoryMap = await this.categoryMap();

        // 获取未处理的成就数据
        const query = 'SELECT * FROM wowhead_achievements WHERE exist IS NULL';
        const items: WowheadAchievement[] =
          await transactionManager.query(query);

        // 处理成就分类
        await this.processAchievementCategories(items);

        // 批量处理成就数据
        const batchSize = 100;
        for (let i = 0; i < items.length; i += batchSize) {
          const batch = items.slice(i, i + batchSize);

          await Promise.all(
            batch.map(async (element: WowheadAchievement) => {
              const version = versionMap.get(element['version'].split('.')[0]);
              console.log(version, 'versionversionversion')
              let categoryId = 0;
              // 优先使用最具体的分类
              if (element.nav4 && categoryMap.has(element.nav4)) {
                categoryId = categoryMap.get(element.nav4) || 0;
              } else if (element.nav3 && categoryMap.has(element.nav3)) {
                categoryId = categoryMap.get(element.nav3) || 0;
              } else if (element.nav2 && categoryMap.has(element.nav2)) {
                categoryId = categoryMap.get(element.nav2) || 0;
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
                achievementEntity.versionId = version || 0; // 修正：这里应该是achievementEntity而不是achievement
                achievementEntity.icon = element.iconLocal;
                achievementEntity.name = element.name;
                achievementEntity.points = element.points;
                achievementEntity.screenshot = element.screenshotLocal;
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
                achievement.categoryId = categoryId; // 使用找到的分类ID
                achievement.versionId = version || 0;
                achievement.icon = element.iconLocal;
                achievement.name = element.name;
                achievement.points = element.points;
                achievement.screenshot = element.screenshotLocal;
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
