import { Controller, Post, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entity/user.entity';
import { AUTHORIZE_MENU_EDIT } from '@/shared/constants/api-authorize';
import { ApiAuthorize } from '@/shared/decorators';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserEntity) {
    return this.authService.login(user);
  }

  @Get('profile')
  @ApiAuthorize(AUTHORIZE_MENU_EDIT)
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
