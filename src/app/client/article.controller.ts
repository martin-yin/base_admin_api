import { ArticleService } from '@/app/admin/article/article.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  CreateArticleDto,
  GetArticleDto,
} from '../admin/article/dto/index.dto';

@Controller('client/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticleList(@Request() req: any, @Query() params: GetArticleDto) {
    return await this.articleService.getArticleList(params);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    return await this.articleService.getArticleById(id);
  }

  @Post()
  async createArticle(@Body() articleData: CreateArticleDto) {
    return await this.articleService.createArticle(articleData);
  }
}
