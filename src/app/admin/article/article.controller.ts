import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/index.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return await this.articleService.getArticleList();
  }

  @Post()
  async create(@Body() body: CreateArticleDto) {
    return await this.articleService.createArticle(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.articleService.deleteArticle(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateArticleDto) {
    return await this.articleService.updateArticle(id, body);
  }
}
