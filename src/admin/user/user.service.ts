import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity, UserRoleEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private createUserEntity(user: CreateUserDto): UserEntity {
    const userEntity = new UserEntity();
    userEntity.userName = user.userName;
    userEntity.password = user.password;
    userEntity.hashSlat = 'hash_slat';
    userEntity.avatar = '';
    return userEntity;
  }

  private createRoleEntities(
    user_id: number,
    roleIds: number[],
  ): UserRoleEntity[] {
    return roleIds.map((roleId) => {
      const userRoleEntity = new UserRoleEntity();
      userRoleEntity.user_id = user_id;
      userRoleEntity.roleId = roleId;
      return userRoleEntity;
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return [];
  }

  async findOneById(id: number): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch {
      throw new Error('用户不存在');
    }
  }

  async findOneByUsername(userName: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { userName },
      });
    } catch {
      throw new Error('用户不存在');
    }
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return await this.entityManager.transaction(async (manager) => {
      if (await this.findOneByUsername(user.userName)) {
        throw new Error('用户名已存在, 请更换用户名');
      }
      const userEntity = await manager.save(this.createUserEntity(user));
      const userRoles = this.createRoleEntities(userEntity.id, user.roleIds);
      await manager.save(userRoles);
      return userEntity;
    });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UserEntity> {
    return await this.entityManager.transaction(async (manager) => {
      const userEntity = await manager.findOne(UserEntity, { where: { id } });
      if (!userEntity) {
        throw new Error('用户不存在');
      }
      await manager.save(UserEntity, { ...userEntity, ...user });
      await manager.delete(UserRoleEntity, { user_id: id });
      const userRoles = this.createRoleEntities(userEntity.id, user.roleIds);
      await manager.save(UserRoleEntity, userRoles);
      return userEntity;
    });
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });
    if (!userEntity) {
      throw new Error('用户不存在');
    }
    return await this.userRepository.save({
      ...userEntity,
      status: 0,
    });
  }
}
