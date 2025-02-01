import { IsEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsEmpty({
    message: '名称不能为空',
  })
  name: string;

  @IsEmpty({
    message: '类型不能为空',
  })
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
