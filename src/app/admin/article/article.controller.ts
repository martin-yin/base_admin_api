import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UpdateArticleDto } from './dto/index.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Post()
  async create(@Body() body: UpdateArticleDto) {
    return await this.articleService.createArticle(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.articleService.deleteArticle(id);
  }
}
