import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, In, Repository } from 'typeorm';
import { CategoryEntity } from './entity';
import { success } from '@/helper/handle';
import { InjectRepository } from '@nestjs/typeorm';
import { DataBasicService } from '@/shared/service/basic.service';
import { TagEntity } from '../tag/entity/index.entity';

@Injectable()
export class CategoryService extends DataBasicService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(categoryRepository);
  }

  async find(id: string | number | FindOneOptions<CategoryEntity>) {
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
    const category = await this.categoryRepository.find({
      where: {
        isDelete: 0,
      },
      order: { sort: 'ASC' },
    });
    return category;
  }

  async getCategoryTagList(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException('分类不存在');
    }

    console.log(category, 'category.tagIds');
    const tagIds = category.tagIds.split(',').map(Number);
    const tagList = await this.tagRepository.find({
      where: {
        id: In(tagIds),
        isDelete: 0,
      },
    });
    return tagList;
  }

  async createCategory(category: Partial<CategoryEntity>) {
    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return success('创建成功', newCategory);
  }

  async editCategory(id: number, category: Partial<CategoryEntity>) {
    const categoryEntity = await this.findOne(id);
    if (!categoryEntity) {
      throw new BadRequestException('分类不存在');
    }
    await this.categoryRepository.update(id, {
      ...categoryEntity,
      ...category,
    });
    return success('编辑成功', category);
  }

  async deleteCategory(id: number) {
    const oldCategory = await this.findOne(id);
    if (!oldCategory) {
      throw new BadRequestException('分类不存在');
    }
    await this.categoryRepository.delete(id);
    return success('删除成功', oldCategory);
  }
}
