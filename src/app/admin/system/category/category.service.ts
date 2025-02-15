import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
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
      order: { sort: 'ASC' },
    });
    return category;
  }

  async getCategoryTagList(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    return null;
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
    await this.categoryRepository.save({
      ...categoryEntity,
      ...category,
      isDelete: 0,
    });
    return success('编辑成功');
  }

  async deleteCategory(id: number) {
    const categoryEntity = await this.findOne(id);
    if (!categoryEntity) {
      throw new BadRequestException('分类不存在');
    }

    await this.categoryRepository.save({
      ...categoryEntity,
      isDelete: 1,
      status: 0,
    });
    return success('删除成功');
  }
}
