import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiAuthorize } from '@/shared/decorators';
import {
  AUTHORIZE_USER_CREATE,
  AUTHORIZE_USER_DELETE,
  AUTHORIZE_USER_GETALL,
  AUTHORIZE_USER_UPDATE,
} from '@/shared/constants/api-authorize';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  async get() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiAuthorize(AUTHORIZE_USER_GETALL)
  async getOne(@Param() id: number) {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiAuthorize(AUTHORIZE_USER_CREATE)
  async create(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  @ApiAuthorize(AUTHORIZE_USER_UPDATE)
  async update(@Param('id') id: number, @Body() user: CreateUserDto) {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiAuthorize(AUTHORIZE_USER_DELETE)
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
