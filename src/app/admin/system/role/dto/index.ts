import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({
    message: '角色名称必须是字符串',
  })
  name: string;

  remark?: string;

  @IsArray({
    message: '菜单权限不能为空',
  })
  menuIds: number[];
}

export class UpdateRoleDto extends CreateRoleDto {}
