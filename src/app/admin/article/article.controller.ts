import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/index.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // async findAll() {
  //   return await this.articleService.findAll();
  // }

  @Post()
  async create(@Body() body: CreateArticleDto) {
    return await this.articleService.createArticle(body);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return await this.articleService.deleteArticle(id);
  // }
}
