import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/index.dto';
import { TagEntity } from '../entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategoryList() {
    return await this.categoryService.getCategoryList();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return await this.categoryService.findOne(id);
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoryService.createCategory(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.categoryService.editCategory(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id);
  }

  @Get(':id/tag')
  async getCategoryByTagId(@Param('id') id: number) {
    return await this.categoryService.getCategoryTagList(id);
  }

  @Post(':id/tag')
  async createCategoryTag(
    @Param('id') id: number,
    @Body() categoryTag: Partial<TagEntity>,
  ) {
    return await this.categoryService.createCategoryTag(categoryTag);
  }

  @Put(':id/tag')
  async editCategoryTag(
    @Param('id') id: number,
    @Body() categoryTag: Partial<TagEntity>,
  ) {
    return await this.categoryService.editCategoryTag(id, categoryTag);
  }

  @Delete(':id/tag')
  async deleteCategoryTag(@Param('id') id: number) {
    return await this.categoryService.deleteCategoryTag(id);
  }
}
