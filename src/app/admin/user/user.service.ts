import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { success } from '@/helper/handle';
import { generateSalt, hashPassword, verifyPassword } from '@/helper/password';
import { Result } from '@/interfaces';
import { DataBaseService } from '@/shared/service/base.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity, UserRoleEntity } from './entity/user.entity';
import { ApiException } from '@/shared/exceptions';

@Injectable()
export class UserService extends DataBaseService<UserEntity> {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  private createUserEntity(user: CreateUserDto): UserEntity {
    const userEntity = new UserEntity();
    userEntity.userName = user.userName;
    userEntity.hashSlat = generateSalt();
    userEntity.password = hashPassword(user.password, userEntity.hashSlat);
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

  async findByUserName(userName: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        userName,
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return [];
  }

  async findOneByUsername(userName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { userName },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async login(userName: string, password: string): Promise<UserEntity> {
    const userEntity = await this.findOneByUsername(userName);
    if (
      !userEntity ||
      !verifyPassword(password, userEntity.hashSlat, userEntity.password)
    ) {
      throw new ApiException(`账号或密码错误`, HttpStatus.UNAUTHORIZED);
    }
    return userEntity;
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return await this.entityManager.transaction(async (manager) => {
      if (await this.findOneByUsername(user.userName)) {
        throw new ApiException(
          '用户名已存在, 请更换用户名',
          HttpStatus.CONFLICT,
        );
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
        throw new ApiException(`用户不存在`, HttpStatus.NOT_FOUND);
      }
      await manager.save(UserEntity, { ...userEntity, ...user });
      await manager.delete(UserRoleEntity, { user_id: id });
      const userRoles = this.createRoleEntities(userEntity.id, user.roleIds);
      await manager.save(UserRoleEntity, userRoles);
      return userEntity;
    });
  }

  async deleteUser(id: number): Promise<Result> {
    await this.baseDelete(id);
    return success('删除用户成功');
  }
}
