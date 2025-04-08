import { ApiException } from '@/core/exceptions';
import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard extends AuthGuard('user-jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    if (
      request.originalUrl.includes('admin') ||
      request.originalUrl.includes('login')
    ) {
      return true;
    }
    const authorization = request.headers.authorization || '';
    const accessToken = authorization.split(' ')[1];
    // 解析令牌载体
    const payload = this.jwtService.decode(accessToken);
    if (_.isNull(payload))
      throw new ApiException('无效的身份认证', HttpStatus.UNAUTHORIZED);
    request['user'] = payload;
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
