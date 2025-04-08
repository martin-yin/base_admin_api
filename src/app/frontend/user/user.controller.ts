import { UserService } from '@/app/admin/user/user.service';
import { User } from '@/shared/auth/decorators';
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as https from 'https';

@Controller('user')
export class UserController {
  private readonly TARGET_DOMAIN = 'discusstest.wowdata.cn';

  constructor(private readonly userService: UserService) {}

  @Get('user-info')
  async getUserInfo(@User() user) {
    return user;
  }

  @Get('proxylogin')
  async proxylogin(@Req() req: Request, @Res() res: Response) {
    try {
      // 构建目标URL
      const targetPath = '/wp-admin/admin-ajax.php?action=get_current_user';

      // 配置代理选项
      const options = {
        hostname: this.TARGET_DOMAIN,
        path: targetPath,
        method: 'GET',
        headers: {
          Host: this.TARGET_DOMAIN,
          Cookie: req.headers.cookie || '',
          'X-Forwarded-Proto': 'https',
        },
        rejectUnauthorized: true,
      };

      // 发起代理请求
      const proxyRequest = new Promise<any>((resolve, reject) => {
        const proxyReq = https.request(options, (proxyRes) => {
          let data = '';

          proxyRes.on('data', (chunk) => {
            data += chunk;
          });

          proxyRes.on('end', () => {
            try {
              // 解析WordPress返回的用户数据
              const userData = JSON.parse(data);
              resolve(userData);
            } catch (error) {
              reject(error);
            }
          });
        });
        proxyReq.on('error', (err) => {
          reject(err);
        });
        proxyReq.end();
      });

      const userData = await proxyRequest;
      console.log(userData);
      const data = this.userService.processWordpressUserData(userData);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('代理登录请求失败:', error);
      res.status(HttpStatus.BAD_GATEWAY).json('error');
    }
  }
}
