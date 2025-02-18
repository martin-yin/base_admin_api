import { ArticleService } from '@/app/admin/article/article.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetArticleDto } from '../admin/article/dto/index.dto';

@Controller('client/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticleList(@Query() params: GetArticleDto) {
    return await this.articleService.getArticleList(params);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }
}
