import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MountEntity } from './entity/mounts.entity';
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
  ) {
    super(mountRepository);
  }

  async findAll() {
    return await this.mountRepository.find();
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
          for (const mount of mounts) {
            const existingMount = await transactionManager.findOne(
              MountEntity,
              { where: { mountId: mount.mountId } },
            );

            if (existingMount) {
              await transactionManager.update(
                MountEntity,
                { mountId: mount.mountId },
                mount,
              );
            } else {
              const newMount = new MountEntity();
              Object.assign(newMount, mount);
              await transactionManager.save(MountEntity, newMount);
            }
          }

          return success('处理成功', {
            total: mounts.length,
          });
        },
      );
    } catch (error) {
      console.error('处理坐骑数据错误:', error);
      throw new ApiException(
        `处理坐骑数据失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
