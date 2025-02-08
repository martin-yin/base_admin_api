import { success } from '@/helper/handle';
import { generateSalt, hashPassword, verifyPassword } from '@/helper/password';
import { Result } from '@/interfaces';
import { ApiException } from '@/shared/exceptions';
import { DataBaseService } from '@/shared/service/base.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateManagementDto,
  QueryManagementDto,
  UpdateManagementDto,
} from './dto';
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
      manager.password,
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
  async findAll(params: QueryManagementDto): Promise<{
    list: ManagementEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { username, page, limit } = params;
    const queryBuilder = this.managementRepository
      .createQueryBuilder('managements')
      .select([
        'managements.id as id',
        'managements.avatar as avatar',
        'managements.username as username',
        'managements.sort as sort',
        'managements.status as status',
        'managements.remark as remark',
        'managements.created_at as createdAt',
        'managements.updated_at as updatedAt',
        'GROUP_CONCAT(roles.name) as roleNames', // 聚合角色名称
        'GROUP_CONCAT(roles.id) as roleIds', // 聚合角色ID
      ])
      .leftJoin(
        'management_roles',
        'management_roles',
        'managements.id = management_roles.management_id',
      )
      .leftJoin('roles', 'roles', 'management_roles.role_id = roles.id')
      .where('managements.is_delete = :isDelete', { isDelete: 0 })
      .where('managements.is_delete = :isDelete', { isDelete: 0 })
      .andWhere('managements.status = :status', { status: 1 })
      .andWhere('roles.status = :status', { status: 1 })
      .andWhere('roles.is_delete = :isDelete', { isDelete: 0 })
      .groupBy('managements.id');

    console.log('username', username);

    if (username) {
      queryBuilder.andWhere('managements.username LIKE :username', {
        username: `%${username}%`, // 模糊查询
      });
    }
    // 获取总数
    const total = await queryBuilder.getCount();

    // 分页查询
    const data = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    return {
      list: data,
      total,
      page,
      limit,
    };
  }

  async findOneByusername(username: string): Promise<ManagementEntity> {
    const user = await this.managementRepository.findOne({
      where: { username, isDelete: 0, status: 1 },
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
      throw new ApiException(
        `账号、密码错误或账号已被禁用`,
        HttpStatus.UNAUTHORIZED,
      );
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
      await manager.delete(ManagementRoleEntity, { managementId: id });
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
