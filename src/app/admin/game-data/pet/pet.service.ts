import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PetEntity } from './entity/pet.entity';
import { success } from '@/core/utils/handle';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class PetService extends DataBasicService<PetEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(PetEntity)
    private PetRepository: Repository<PetEntity>,
  ) {
    super(PetRepository);
  }

  async findAll() {
    return await this.PetRepository.find();
  }

  /**
   * @description 创建或更新坐骑数据
   * @param Pets
   * @returns
   */
  async createPetsData(Pets: PetEntity[]) {
    try {
      return await this.entityManager.transaction(
        async (transactionManager) => {
          for (const Pet of Pets) {
            const existingPet = await transactionManager.findOne(PetEntity, {
              where: { petId: Pet.petId },
            });

            if (existingPet) {
              await transactionManager.update(
                PetEntity,
                { petId: Pet.petId },
                Pet,
              );
            } else {
              const newPet = new PetEntity();
              Object.assign(newPet, Pet);
              await transactionManager.save(PetEntity, newPet);
            }
          }

          return success('处理成功', {
            total: Pets.length,
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
