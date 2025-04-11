import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGuard extends AuthGuard('user-jwt') {
  constructor(
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    if (request.originalUrl.includes('admin')) {
      return true;
    }
    const authorization = request.headers.authorization || '';
    const accessToken = authorization.split(' ')[1];
    const payload = this.jwtService.decode(accessToken);
    if (_.isNull(payload))
      return true;
    request['user'] = payload;
    request['userId'] = payload['userId'];
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    return user;
  }
}
