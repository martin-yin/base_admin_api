import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from './jwt.strategy';

export interface UserJwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class UserJwtStrategy extends BaseJwtStrategy {
  constructor(protected readonly configService: ConfigService) {
    super(configService, 'JWT_ACCESS_TOKEN_SECRET');
  }

  async validate(payload: UserJwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      isAdmin: true,
    };
  }
}
