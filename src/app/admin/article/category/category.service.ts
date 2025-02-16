import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { success } from '@/helper/handle';
import { InjectRepository } from '@nestjs/typeorm';
import { DataBasicService } from '@/shared/service/basic.service';
import { CategoryEntity, TagEntity } from '../entity/category.entity';

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

  async createCategory(category: Partial<CategoryEntity>) {
    const categoryEntity = this.categoryRepository.create(category);
    await this.categoryRepository.save(categoryEntity);
    return success('创建成功');
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

  async getCategoryTagList(id: number): Promise<TagEntity[]> {
    const category = await this.findOne(id);
    if (!category) {
      throw new BadRequestException('分类不存在');
    }
    const categoryTagEntityList = await this.tagRepository.find({
      where: { categoryId: id },
    });
    return categoryTagEntityList;
  }

  async createCategoryTag(categoryTag: Partial<TagEntity>) {
    const newCategoryTag = this.tagRepository.create(categoryTag);
    await this.tagRepository.save(newCategoryTag);
    return success('创建成功', newCategoryTag);
  }

  async editCategoryTag(id: number, categoryTag: Partial<TagEntity>) {
    const categoryTagEntity = await this.findOne(id);
    if (!categoryTagEntity) {
      throw new BadRequestException('分类标签不存在');
    }
    await this.tagRepository.save({
      ...categoryTagEntity,
      ...categoryTag,
    });
    return success('编辑成功');
  }

  async deleteCategoryTag(id: number) {
    const categoryTagEntity = await this.tagRepository.findOne({
      where: { id: id },
    });
    if (!categoryTagEntity) {
      throw new BadRequestException('分类标签不存在');
    }
    await this.tagRepository.delete(id);
    return success('删除成功');
  }
}
