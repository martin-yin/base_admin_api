import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
