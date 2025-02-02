import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { UserEntity } from '../user/entity/user.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    const userEntity = await this.userService.login(
      user.userName,
      user.password,
    );
    const { userName, id } = userEntity;
    const payload = { userName, sub: id };
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
    console.log(permissionList, '=====');
    const user = await this.userService.findOne(id);
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
