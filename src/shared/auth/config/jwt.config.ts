import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private configService: ConfigService,
    private readonly type: 'admin' | 'user' = 'admin',
  ) {}

  createJwtOptions(): JwtModuleOptions {
    const secretKey =
      this.type === 'admin' ? 'JWT_ADMIN_SECRET' : 'JWT_USER_SECRET';

    const expirationKey =
      this.type === 'admin'
        ? 'JWT_ADMIN_EXPIRATION_TIME'
        : 'JWT_USER_EXPIRATION_TIME';

    return {
      secret: this.configService.get(secretKey),
      signOptions: {
        expiresIn: this.configService.get(expirationKey),
      },
    };
  }
}
