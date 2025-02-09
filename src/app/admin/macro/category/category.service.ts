import { DataBaseService } from '@/shared/service/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { MacroCategoryEntity } from './entity';
import { success } from '@/helper/handle';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService extends DataBaseService<MacroCategoryEntity> {
  constructor(
    @InjectRepository(MacroCategoryEntity)
    private readonly categoryRepository: Repository<MacroCategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async find(id: string | number | FindOneOptions<MacroCategoryEntity>) {
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
        status: 1,
        isDelete: 0,
      },
    });
    return category;
  }

  async createCategory(category: Partial<MacroCategoryEntity>) {
    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return success('创建成功', newCategory);
  }

  async editCategory(id: number, category: Partial<MacroCategoryEntity>) {
    const oldCategory = await this.findOne(id);
    if (!oldCategory) {
      throw new BadRequestException('分类不存在');
    }
    await this.categoryRepository.update(id, category);
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
