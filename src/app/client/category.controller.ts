import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '@/app/admin/article/category/category.service';

@Controller('client/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategoryList() {
    const categoryList = await this.categoryService.getCategoryList();
    return categoryList;
  }

  @Get(':id/tag')
  async getCategoryTagList(id: number) {
    const categoryTagList = await this.categoryService.getCategoryTagList(id);
    return categoryTagList;
  }
}
