import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString({
    message: '名称不能为空',
  })
  name: string;

  @IsNumber({}, { message: '类型不能为空' })
  @IsIn([0, 1, 2], { message: '类型错误' })
  menuType: number;

  url: string;
  component: string;
  componentName: string;
  redirect: string;
  icon: string;
  sort: number;
  keepAlive: number;
  hide: number;
  openType: number;
  parentId: number;
  perms: string;
}

export class UpdateMenuDto extends CreateMenuDto {}
