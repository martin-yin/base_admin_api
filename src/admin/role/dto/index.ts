import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({
    message: '角色名称必须是字符串',
  })
  roleName: string;

  desc: string;

  @IsArray({
    message: '菜单权限不能为空',
  })
  menuIds: number[];
}

export class UpdateRoleDto extends CreateRoleDto {}
