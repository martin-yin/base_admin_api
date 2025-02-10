import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.dto';
import { CategoryService } from './category.service';

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

  @Get('tag/:id')
  async getCategoryByTagId(@Param('id') id: number) {
    return await this.categoryService.getCategoryTagList(id);
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
}
