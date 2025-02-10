import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({
    message: '标签名称不能为空',
  })
  name: string;

  remark?: string;

  @IsNumber({}, { message: '父级标签不能为空' })
  parentId: number;

  @IsString({
    message: '标签图标不能为空',
  })
  icon: string;

  sort?: number;
}

export class UpdateTagDto extends CreateTagDto {}
