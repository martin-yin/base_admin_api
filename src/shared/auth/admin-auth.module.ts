import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from './config/jwt.config';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtConfig = new JwtConfigService(configService, 'admin');
        return jwtConfig.createJwtOptions();
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AdminJwtStrategy],
  exports: [JwtModule, AdminJwtStrategy],
})
export class AdminAuthModule {}
