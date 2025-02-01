import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoleEntity, RoleMenuEntity } from './entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

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
    return await this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async updateRole(id: number, role: UpdateRoleDto): Promise<RoleEntity> {
    return await this.entityManager.transaction(async (manager) => {
      let roleEntity = await this.roleRepository.findOne({ where: { id } });
      if (!roleEntity) {
        throw Error('角色不存在！');
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
}
