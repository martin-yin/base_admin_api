import { IsString } from 'class-validator';

export class UpdateArticleDto {
  id: number;
  title: string;
  desc: string;
  cover: string;
  type: string;
  status: number;
  categoryId: number;
  carouselImages: string;
  content: string;
  autherId: number;
  source: string;
  tagIds: string;
  viewCount: number;
  collectCount: number;
  marcoCode: string;
}

export class CreateArticleDto {
  title: string;
  desc: string;
  cover: string;
  type: string;
  status: number;
  categoryId: number;
  carouselImages: string;
  content: string;
  autherId: number;
  source: string;
  tagIds: string;
  viewCount: number;
  collectCount: number;
  marcoCode: string;
}

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
