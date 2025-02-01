import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create(role);
    return await this.roleRepository.save(newRole);
  }

  async getRoleList(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async updateRole(id: number, role: UpdateRoleDto): Promise<RoleEntity> {
    const roleEntity = await this.roleRepository.findOne({ where: { id } });
    roleEntity.roleName = role.roleName;
    roleEntity.desc = role.desc;
    return await this.roleRepository.save(roleEntity);
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.update(id, { isDelete: 1 });
  }
}
