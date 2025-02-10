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
import { CreateTagDto, UpdateTagDto } from './dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTagList() {
    return await this.tagService.getTagList();
  }

  @Get(':id')
  async getTagById(@Param('id') id: number) {
    return await this.tagService.findOne(id);
  }

  @Post()
  async createTag(@Body() Tag: CreateTagDto) {
    return await this.tagService.createTag(Tag);
  }

  @Put(':id')
  async updateTag(@Param('id') id: number, @Body() Tag: UpdateTagDto) {
    return await this.tagService.editTag(id, Tag);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number) {
    return await this.tagService.deleteTag(id);
  }
}
