import { DataBasicService } from '@/shared/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { MenuEntity } from './entity';

@Injectable()
export class MenuService extends DataBasicService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
  ) {
    super(menuRepository);
  }

  async getMenuList(buildTree: boolean): Promise<MenuEntity[]> {
    const menus = await this.menuRepository.find({
      where: {
        isDelete: 0,
      },
      order: {
        sort: 'ASC',
      },
    });
    return buildTree ? this.buildTree(menus) : menus;
  }

  private buildTree(menus: MenuEntity[], parentId: number = 0): MenuEntity[] {
    return menus
      .filter((menu) => menu.parentId === parentId)
      .map((menu) => {
        const item = {
          ...menu,
          children: this.buildTree(menus, menu.id),
        };
        if (item.children.length === 0) {
          delete item.children;
        }
        return item;
      });
  }

  async createMenu(menu: CreateMenuDto): Promise<MenuEntity> {
    const result = await this.menuRepository.save(
      this.menuRepository.create({
        ...menu,
        parentId: menu.parentId || 0,
      }),
    );
    return result;
  }

  async updateMenu(id: number, menu: UpdateMenuDto): Promise<MenuEntity> {
    const menuEntity = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    if (!menuEntity) {
      throw new Error('菜单不存在');
    }
    return await this.menuRepository.save({ ...menuEntity, ...menu });
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
