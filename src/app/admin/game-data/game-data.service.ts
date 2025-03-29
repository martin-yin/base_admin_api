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

  async getPetList() {
    return await this.petRepository.find();
  }

  async getToyList() {
    return await this.toyRepository.find();
  }
  async getMountList() {
    return await this.mountRepository.find();
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
