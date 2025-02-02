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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: CreateUserDto) {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
