import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MountEntity } from './entity/mounts.entity';
// import { WoWHeadMountEntity } from './entity/wowhead-mounts.entity';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MountService extends DataBasicService<MountEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(MountEntity)
    private mountRepository: Repository<MountEntity>,
    // @InjectRepository(WoWHeadMountEntity)
    // private wowheadMountEntity: Repository<WoWHeadMountEntity>,
  ) {
    super(mountRepository);
  }

  /**
   * @description 创建或更新坐骑数据
   * @param mounts
   * @returns
   */
  async createMountsData(mounts: MountEntity[]) {
    try {
      return await this.entityManager.transaction(
        async (transactionManager) => {
          // 统计创建和更新的数量
          // 处理每个坐骑数据
          for (const mount of mounts) {
            // 检查坐骑是否已存在
            const existingMount = await transactionManager.findOne(
              MountEntity,
              { where: { mountId: mount.mountId } },
            );

            if (existingMount) {
              // 如果存在，则更新
              await transactionManager.update(
                MountEntity,
                { mountId: mount.mountId },
                { ...mount },
              );
            } else {
              // 如果不存在，则创建
              const newMount = this.mountRepository.create({ ...mount });
              await transactionManager.save(MountEntity, newMount);
            }
          }

          return success('处理成功');
        },
      );
    } catch (error) {
      throw new ApiException(
        `处理坐骑数据失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
