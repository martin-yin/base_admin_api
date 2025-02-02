import { IsArray, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: '用户名不能为空',
  })
  userName: string;

  @IsString({
    message: '密码不能为空',
  })
  password: string;

  @IsArray({
    message: '请选择角色',
  })
  roleIds: number[];
}

export class UpdateUserDto extends CreateUserDto {}
