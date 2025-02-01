import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuEntity } from './entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,

    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {}

  async getMenuTree(parentId: number = 0): Promise<MenuEntity[]> {
    const menus = await this.menuRepository.find({
      where: { parentId },
      order: { sort: 'ASC' },
    });

    return menus;
  }

  async createMenu(menu: CreateMenuDto): Promise<MenuEntity> {
    const menuEntity = this.menuRepository.create({
      ...menu,
    });
    const result = await this.menuRepository.save(menuEntity);
    return result;
  }

  async updateMenu(id: number, menu: UpdateMenuDto): Promise<MenuEntity> {
    const menuEntity = await this.menuRepository.findOne({
      where: { id },
    });
    if (!menuEntity) {
      throw new Error('菜单不存在');
    }
    return await this.menuRepository.merge(menuEntity, {
      ...menu,
    });
  }

  async deleteMenu(id: number): Promise<boolean> {
    try {
      const reulst = await this.menuRepository.update(id, {
        isDelete: 1,
      });
      if (reulst.affected === 1) {
        return true;
      }
      return false;
    } catch {
      throw new Error('删除菜单失败');
    }
  }
}
