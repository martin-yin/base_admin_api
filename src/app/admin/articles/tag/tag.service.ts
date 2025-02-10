import { DataBasicService } from '@/shared/service/basic.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { success } from '@/helper/handle';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '../entity/tag.entity';

@Injectable()
export class TagService extends DataBasicService<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(tagRepository);
  }

  async find(id: string | number | FindOneOptions<TagEntity>) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    return category;
  }

  /**
   * @description 获取分类列表
   * @param parent_id
   * @returns
   */
  async getCategoryList() {
    const category = await this.tagRepository.find({
      where: {
        status: 1,
        isDelete: 0,
      },
    });
    return category;
  }

  async createCategory(category: Partial<TagEntity>) {
    const newCategory = this.tagRepository.create(category);
    await this.tagRepository.save(newCategory);
    return success('创建成功', newCategory);
  }

  async editCategory(id: number, category: Partial<TagEntity>) {
    const oldCategory = await this.findOne(id);
    if (!oldCategory) {
      throw new BadRequestException('分类不存在');
    }
    await this.tagRepository.update(id, category);
    return success('编辑成功', category);
  }

  async deleteCategory(id: number) {
    const oldCategory = await this.findOne(id);
    if (!oldCategory) {
      throw new BadRequestException('分类不存在');
    }
    await this.tagRepository.delete(id);
    return success('删除成功', oldCategory);
  }
}
