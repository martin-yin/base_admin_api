import { success } from '@/helper/handle';
import { generateSalt, hashPassword, verifyPassword } from '@/helper/password';
import { Result } from '@/interfaces';
import { ApiException } from '@/shared/exceptions';
import { DataBaseService } from '@/shared/service/base.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateManagementDto, UpdateManagementDto } from './dto';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from './entity/management.entity';

@Injectable()
export class ManagementService extends DataBaseService<ManagementEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(ManagementEntity)
    private managementRepository: Repository<ManagementEntity>,
  ) {
    super(managementRepository);
  }

  private createManagesEntity(manager: CreateManagementDto): ManagementEntity {
    const managesEntity = new ManagementEntity();
    managesEntity.username = manager.username;
    managesEntity.hashSlat = generateSalt();
    managesEntity.password = hashPassword(
      managesEntity.password,
      managesEntity.hashSlat,
    );
    managesEntity.avatar = '';
    return managesEntity;
  }

  private createManagerRoleEntities(
    managerId: number,
    roleIds: number[],
  ): ManagementRoleEntity[] {
    return roleIds.map((roleId) => {
      const managerRoleEntity = new ManagementRoleEntity();
      managerRoleEntity.managementId = managerId;
      managerRoleEntity.roleId = roleId;
      return managerRoleEntity;
    });
  }

  async findByUserName(username: string): Promise<ManagementEntity> {
    return this.managementRepository.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * @description 查询所有的管理员
   * @returns ManagesEntity[]
   */
  async findAll(): Promise<ManagementEntity[]> {
    return await this.managementRepository
      .createQueryBuilder('managements')
      .select([
        'managements.id as id',
        'managements.avatar as avatar',
        'managements.username as username',
        'managements.sort as sort',
        'managements.status as status',
        'managements.remark as remark',
        'managements.created_at as created_at',
        'managements.updated_at as updated_at',
        'GROUP_CONCAT(role.name) as role_names', // 聚合角色名称
      ])
      .leftJoin(
        'management_roles',
        'management_roles',
        'manager.id = management_roles.user_id',
      )
      .leftJoin('role', 'role', 'management_roles.role_id = role.id')
      .where('managements.is_delete = :isDelete', { isDelete: 0 })
      .groupBy('managements.id') // 按用户ID分组
      .getRawMany();
  }

  async findOneByusername(username: string): Promise<ManagementEntity> {
    const user = await this.managementRepository.findOne({
      where: { username },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async login(username: string, password: string): Promise<ManagementEntity> {
    const managesEntity = await this.findOneByusername(username);
    if (
      !managesEntity ||
      !verifyPassword(password, managesEntity.hashSlat, managesEntity.password)
    ) {
      throw new ApiException(`账号或密码错误`, HttpStatus.UNAUTHORIZED);
    }
    return managesEntity;
  }

  async createManagement(
    managementDto: CreateManagementDto,
  ): Promise<ManagementEntity> {
    return await this.entityManager.transaction(async (manager) => {
      if (await this.findOneByusername(managementDto.username)) {
        throw new ApiException(
          '用户名已存在, 请更换用户名',
          HttpStatus.CONFLICT,
        );
      }
      const managementEntity = await manager.save(
        this.createManagesEntity(managementDto),
      );
      const managerRoles = this.createManagerRoleEntities(
        managementEntity.id,
        managementDto.roleIds,
      );
      await manager.save(managerRoles);
      return managementEntity;
    });
  }

  async updateManagement(
    id: number,
    managementDto: UpdateManagementDto,
  ): Promise<ManagementEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const managementEntity = await manager.findOne(ManagementEntity, {
        where: { id },
      });
      if (!managementEntity) {
        throw new ApiException(`用户不存在`, HttpStatus.NOT_FOUND);
      }
      await manager.save(ManagementEntity, {
        ...managementEntity,
        ...managementDto,
      });
      await manager.delete(ManagementRoleEntity, { manager_id: id });
      const managerRoles = this.createManagerRoleEntities(
        managementEntity.id,
        managementDto.roleIds,
      );
      await manager.save(ManagementRoleEntity, managerRoles);
      return managementEntity;
    });
  }

  async deleteManagement(id: number): Promise<Result> {
    await this.baseDelete(id);
    return success('删除用户成功');
  }
}
