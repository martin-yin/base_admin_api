import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { ApiException } from '@/core/exceptions/api.exception';
import { AUTHORIZE_METADATA } from '@/shared/constants/api-authorize';
@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin-jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    if (request.originalUrl.includes("/login") || !request.originalUrl.includes("admin")) {
      return true;
    }
    const permissionList = this.reflector.get<
      Array<string | Array<string | null>>
    >(AUTHORIZE_METADATA, context.getHandler());

    if (!permissionList) {
      return super.canActivate(context);
    }
    // 获取请求头里的访问令牌
    const authorization = request.headers.authorization || '';
    const accessToken = authorization.split(' ')[1];
    // 解析令牌载体
    const payload = this.jwtService.decode(accessToken);
    if (_.isNull(payload))
      throw new ApiException('无效的身份认证', HttpStatus.UNAUTHORIZED);
    request['userId'] = payload['userId'];
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
