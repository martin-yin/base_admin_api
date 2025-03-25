import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseJwtStrategy } from './jwt.strategy';

export interface AdminJwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class AdminJwtStrategy extends BaseJwtStrategy {
  constructor(protected readonly configService: ConfigService) {
    super(configService, 'JWT_ADMIN_SECRET');
  }

  async validate(payload: AdminJwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      isAdmin: true,
    };
  }
}
