import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({
    message: '角色名称必须是字符串',
  })
  roleName: string;
  desc: string;
}

export class UpdateRoleDto extends CreateRoleDto {}
