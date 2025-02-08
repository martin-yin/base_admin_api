import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateManagementDto {
  @IsString({
    message: '用户名不能为空',
  })
  username: string;

  @IsString({
    message: '密码不能为空',
  })
  password: string;

  @IsArray({
    message: '请选择角色',
  })
  roleIds: number[];
}

export class UpdateManagementDto extends CreateManagementDto {}

export class QueryManagementDto {
  @IsOptional()
  @IsString()
  username?: string; // 用户名过滤条件（可选）

  page: number; // 当前页码

  limit: number; // 每页条数
}
