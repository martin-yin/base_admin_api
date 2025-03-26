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
      this.type === 'admin'
        ? 'JWT_ACCESS_TOKEN_SECRET'
        : 'JWT_ACCESS_TOKEN_SECRET';

    const expirationKey =
      this.type === 'admin'
        ? 'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
        : 'JWT_ACCESS_TOKEN_EXPIRATION_TIME';

    return {
      secret: this.configService.get(secretKey),
      signOptions: {
        expiresIn: this.configService.get(expirationKey),
      },
    };
  }
}
