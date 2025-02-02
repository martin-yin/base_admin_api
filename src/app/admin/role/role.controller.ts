import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoleList(): Promise<RoleEntity[]> {
    return await this.roleService.getRoleList();
  }

  @Post()
  async createRole(@Body() role: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleService.createRole(role);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return await this.roleService.deleteRole(id);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() role: UpdateRoleDto,
  ): Promise<RoleEntity> {
    return await this.roleService.updateRole(id, role);
  }
}
