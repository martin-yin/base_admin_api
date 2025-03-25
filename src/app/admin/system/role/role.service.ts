import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoleEntity, RoleMenuEntity } from './entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { DataBasicService } from '@/shared/services/basic.service';
import { RoleInfo } from './types';
import { ApiException } from '@/common/core/exceptions';

@Injectable()
export class RoleService extends DataBasicService<RoleEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private roleMenuRepository: Repository<RoleMenuEntity>,
  ) {
    super(roleRepository);
  }

  private createRoleMenuEntity(
    role_id: number,
    menuIds: number[],
  ): RoleMenuEntity[] {
    return menuIds.map((menuId) => {
      const roleMenuEntity = new RoleMenuEntity();
      roleMenuEntity.roleId = role_id;
      roleMenuEntity.menuId = menuId;
      return roleMenuEntity;
    });
  }

  async getRoleById(id: number): Promise<RoleInfo> {
    const roleEntity = await this.findOne(id);
    if (!roleEntity) {
      throw new ApiException(`角色不存在！`, HttpStatus.NOT_FOUND);
    }
    const roleMenu = await this.roleMenuRepository.find({
      where: { roleId: id },
    });
    const menuIds = roleMenu.map((item) => item.menuId);
    return {
      ...roleEntity,
      menuIds,
    };
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const roleEntity = await manager.save(
        RoleEntity,
        this.roleRepository.create(role),
      );
      await manager.save(
        RoleMenuEntity,
        this.createRoleMenuEntity(roleEntity.id, role.menuIds),
      );
      return roleEntity;
    });
  }

  async getRoleList(): Promise<RoleEntity[]> {
    return await this.roleRepository.find({
      where: { isDelete: 0 },
      order: { sort: 'ASC' },
    });
  }

  async updateRole(id: number, role: UpdateRoleDto): Promise<RoleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      let roleEntity = await this.findOne(id);
      if (!roleEntity) {
        throw new ApiException(`角色不存在！`, HttpStatus.NOT_FOUND);
      }
      roleEntity = await this.roleRepository.save({ ...roleEntity, ...role });
      await manager.delete(RoleMenuEntity, { roleId: id });
      await manager.save(
        RoleMenuEntity,
        this.createRoleMenuEntity(id, role.menuIds),
      );
      return roleEntity;
    });
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.update(id, { isDelete: 1 });
  }

  async getRolePermissionList(id: number) {
    const roleMenu = await this.repository.find({
      where: { id },
    });
    console.log(roleMenu);
    return [];
  }
}
