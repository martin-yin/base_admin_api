import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from '../dto/tag';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getCategoryList() {
    return await this.tagService.getCategoryList();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return await this.tagService.findOne(id);
  }

  @Post()
  async createCategory(@Body() category: CreateTagDto) {
    return await this.tagService.createCategory(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() category: UpdateTagDto,
  ) {
    return await this.tagService.basicUpdate(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.tagService.deleteCategory(id);
  }
}
