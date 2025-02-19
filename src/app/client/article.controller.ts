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
import { ConfigService } from '@nestjs/config';
import { ArticleEntity } from '../admin/article/entity/article.entity';

@Controller('client/article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private configService: ConfigService,
  ) {}

  addArticleImagePrefix(article: ArticleEntity) {
    const prefix = this.configService.get('DOMAIN');
    article.cover = prefix + article.cover;
    article.carouselImages = article.carouselImages?.map(
      (item) => prefix + item,
    );
    article.tags = article.tags?.map((item) => {
      item.icon = prefix + item.icon;
      return item;
    });
    return article;
  }
  @Get()
  async getArticleList(@Request() req: any, @Query() params: GetArticleDto) {
    return await this.articleService.getArticleList(params);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    const data = await this.articleService.getArticleDetail(id);
    data.article = this.addArticleImagePrefix(data.article);
    return data;
  }

  @Get(':id/history/:versionId')
  async getArticleHistory(
    @Param('id') id: number,
    @Param('versionId') versionId: number,
  ) {
    const data = await this.articleService.getArticleDetailByVersion(
      versionId,
      id,
    );
    data.article = this.addArticleImagePrefix(data.article);
    return data;
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
