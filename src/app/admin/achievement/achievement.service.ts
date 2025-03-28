import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AchievementEntity } from './entity/index.entity';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AchievementService extends DataBasicService<AchievementEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(AchievementEntity)
    private achievementRepository: Repository<AchievementEntity>,
  ) {
    super(achievementRepository);
  }

  async findAll() {
    return await this.achievementRepository.find();
  }

  /**
   * @description 创建或更新成就数据
   * @param achievements 成就数据数组
   * @returns 处理结果
   */
  async createAchievementData(achievements: AchievementEntity[]) {
    try {
      return await this.entityManager.transaction(
        async (transactionManager) => {
          for (const achievement of achievements) {
            // 查找是否已存在该成就
            const existingAchievement = await transactionManager.findOne(
              AchievementEntity,
              { where: { achievementId: achievement.achievementId } },
            );

            if (existingAchievement) {
              await transactionManager.update(
                AchievementEntity,
                { achievementId: achievement.achievementId },
                achievement,
              );
            } else {
              const newAchievement = new AchievementEntity();
              Object.assign(newAchievement, achievement);
              await transactionManager.save(AchievementEntity, newAchievement);
            }
          }

          return success('处理成功', {
            total: achievements.length,
          });
        },
      );
    } catch (error) {
      console.error('处理成就数据错误:', error);
      throw new ApiException(
        `处理成就数据失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
