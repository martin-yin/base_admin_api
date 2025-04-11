import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ManagementEntity } from '../management/entity/management.entity';

@Controller('admin/system/auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: ManagementEntity) {
    return this.authService.login(user);
  }
}
