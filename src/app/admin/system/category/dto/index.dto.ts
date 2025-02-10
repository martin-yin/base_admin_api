import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: '标签名称不能为空',
  })
  name: string;

  remark?: string;

  @IsString({
    message: '标签图标不能为空',
  })
  icon: string;

  sort?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
