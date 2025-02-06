import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiAuthorize } from '@/shared/decorators';
import {
  AUTHORIZE_USER_CREATE,
  AUTHORIZE_USER_DELETE,
  AUTHORIZE_USER_GETALL,
  AUTHORIZE_USER_UPDATE,
} from '@/shared/constants/api-authorize';
import { ManagementService } from './management.service';
import { CreateManagementDto, UpdateManagementDto } from './dto';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Get()
  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  async get() {
    return await this.managementService.findAll();
  }

  @Get(':id')
  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  async getOne(@Param() id: number) {
    return await this.managementService.findOne(id);
  }

  @Post()
  @ApiAuthorize(AUTHORIZE_USER_CREATE)
  async create(@Body() managerDto: CreateManagementDto) {
    return await this.managementService.createManagement(managerDto);
  }

  @Put(':id')
  @ApiAuthorize(AUTHORIZE_USER_UPDATE)
  async update(
    @Param('id') id: number,
    @Body() managerDto: UpdateManagementDto,
  ) {
    return await this.managementService.updateManagement(id, managerDto);
  }

  @Delete(':id')
  @ApiAuthorize(AUTHORIZE_USER_DELETE)
  async delete(@Param('id') id: number) {
    return await this.managementService.deleteManagement(id);
  }
}
