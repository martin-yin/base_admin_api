import { DataBasicService } from '@/shared/service/basic.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { success } from '@/helper/handle';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entity/index.entity';

@Injectable()
export class TagService extends DataBasicService<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(tagRepository);
  }

  async find(id: string | number | FindOneOptions<TagEntity>) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new BadRequestException('标签不存在');
    }
    return tag;
  }

  /**
   * @description 获取标签列表
   * @param parent_id
   * @returns
   */
  async getTagList() {
    const tagList = await this.tagRepository.find({
      where: {
        isDelete: 0,
      },
    });
    return tagList;
  }

  async createTag(Tag: Partial<TagEntity>) {
    const tagEntity = this.tagRepository.create(Tag);
    await this.tagRepository.save(tagEntity);
    return success('创建成功', tagEntity);
  }

  async editTag(id: number, tag: Partial<TagEntity>) {
    const tagEntity = await this.findOne(id);
    if (!tagEntity) {
      throw new BadRequestException('标签不存在');
    }

    const tagEntityUpdate = await this.tagRepository.create({
      ...tagEntity,
      ...tag,
    });
    const newTag = await this.tagRepository.update(id, tagEntityUpdate);
    return success('编辑成功', newTag);
  }

  async deleteTag(id: number) {
    const tagEntity = await this.findOne(id);
    if (!tagEntity) {
      throw new BadRequestException('标签不存在');
    }
    await this.tagRepository.delete(id);
    return success('删除成功');
  }
}
