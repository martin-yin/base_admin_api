import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ToyEntity } from '../achievement/entity/toy.entity';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ToyService extends DataBasicService<ToyEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(ToyEntity)
    private ToyRepository: Repository<ToyEntity>,
  ) {
    super(ToyRepository);
  }

  async findAll() {
    return await this.ToyRepository.find();
  }

  /**
   * @description 创建或更玩具数据
   * @param Toys
   * @returns
   */
  async createToysData(Toys: ToyEntity[]) {
    try {
      return await this.entityManager.transaction(
        async (transactionManager) => {
          for (const Toy of Toys) {
            const existingToy = await transactionManager.findOne(ToyEntity, {
              where: { toyId: Toy.toyId },
            });

            if (existingToy) {
              await transactionManager.update(
                ToyEntity,
                { toyId: Toy.toyId },
                Toy,
              );
            } else {
              const newToy = new ToyEntity();
              Object.assign(newToy, Toy);
              await transactionManager.save(ToyEntity, newToy);
            }
          }

          return success('处理成功', {
            total: Toys.length,
          });
        },
      );
    } catch (error) {
      console.error('处理玩具数据错误:', error);
      throw new ApiException(
        `处理玩具数据失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
