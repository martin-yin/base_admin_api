import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: '分类名称不能为空',
  })
  name: string;

  remark?: string;

  @IsNumber({}, { message: '父级分类不能为空' })
  parentId: number;

  @IsString({
    message: '分类图标不能为空',
  })
  icon: string;

  sort?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
