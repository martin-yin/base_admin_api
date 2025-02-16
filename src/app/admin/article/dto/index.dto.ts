import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { TagEntity } from '../entity/category.entity';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  summary: string;

  @IsString()
  cover: string;

  @IsArray()
  @IsOptional()
  carouselImages: string[];

  @IsNumber()
  pluginCategoryId: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  userId: number;

  @IsString()
  content: string;

  @IsString()
  code: string;

  @IsNumber()
  viewCount: number;

  @IsArray()
  tags: number[];
}

export class UpdateArticleDto extends CreateArticleDto {
  id: number;
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
