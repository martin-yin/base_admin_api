import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { RoleService } from '../role/role.service';
import { ManagementService } from '../management/management.service';
import { ManagementEntity } from '../management/entity/management.entity';

@Injectable()
export class AuthService {
  constructor(
    private managementService: ManagementService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.managementService.findByUserName(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: ManagementEntity) {
    const managementEntity = await this.managementService.login(
      user.username,
      user.password,
    );
    const { username, id } = managementEntity;
    const payload = { username, sub: id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * 根据id 获取到角色的权限
   * @param id
   * @returns
   */
  async validatePerm(
    id: number,
    permissionList: Array<Array<string | null> | string>,
  ) {
    const user = await this.managementService.findOne(id);
    const userPermission = await this.roleService.getRolePermissionList(
      user.id,
    );
    const orPermissionList: string[] = [];
    const andPermissionList = permissionList.filter((perm) => {
      if (typeof perm === 'string') {
        orPermissionList.push(perm);
      }
      return Array.isArray(perm);
    });
    // 判断交集数量是否大于0
    if (_.intersection(userPermission, orPermissionList).length) {
      return true;
    }
    // 判断是否包含
    for (const andPermission of andPermissionList) {
      if (
        _.intersection(userPermission, andPermission).length ===
        andPermission.length
      ) {
        return true;
      }
    }
    // 判断交集数量是否大于0
    if (_.intersection(userPermission, permissionList).length) {
      return true;
    }
    return false;
  }
}
