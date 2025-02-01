import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './public';
import { ApiAuthorize } from 'src/shared/decorators';
import { AUTHORIZE_MENU_GETALL } from 'src/shared/constants/api-authorize';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiAuthorize(AUTHORIZE_MENU_GETALL)
  getProfile(@Request() req) {
    return req.user;
  }
}
