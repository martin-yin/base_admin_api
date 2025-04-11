import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuEntity } from './entity';
import { CreateMenuDto } from './dto';

@Controller('admin/system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenuTree(
    @Query('buildTree') buildTree: boolean = false,
  ): Promise<any> {
    return await this.menuService.getMenuList(buildTree);
  }

  @Post()
  async createMenu(@Body() menu: CreateMenuDto): Promise<MenuEntity> {
    return await this.menuService.createMenu(menu);
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: number,
    @Body() menu: CreateMenuDto,
  ): Promise<MenuEntity> {
    return await this.menuService.updateMenu(id, menu);
  }

  @Delete(':id')
  async deleteMenu(@Param('id') id: number): Promise<boolean> {
    return await this.menuService.deleteMenu(id);
  }
}
