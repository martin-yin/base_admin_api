import { UserService } from '@/app/admin/user/user.service';
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as https from 'https';

@Controller('user')
export class UserController {
  private readonly TARGET_DOMAIN = 'discusstest.wowdata.cn';

  constructor(private readonly userService: UserService) {}

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
              console.log(userData);
              // 处理用户数据，可以在这里进行加密或其他处理
              // const processedData =
              // this.userService.processWordpressUserData(userData);
              resolve(null);
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
      return res.status(HttpStatus.OK).json(userData);
    } catch (error) {
      console.error('代理登录请求失败:', error);
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: '代理请求失败',
        error: error.message,
      });
    }
  }
}
