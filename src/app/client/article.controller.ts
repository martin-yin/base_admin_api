import { ArticleService } from '@/app/admin/article/article.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import {
  CreateArticleDto,
  GetArticleDto,
  UpdateArticleDto,
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

  @Put(':id')
  async updateArticle(
    @Param('id') id: number,
    @Body() articleData: UpdateArticleDto,
  ) {
    return await this.articleService.updateArticle(id, articleData);
  }

  @Post()
  async createArticle(@Body() articleData: CreateArticleDto) {
    return await this.articleService.createArticle(articleData);
  }
}
