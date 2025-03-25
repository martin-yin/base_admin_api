import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigService } from './config/jwt.config';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'user-jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const jwtConfig = new JwtConfigService(configService, 'user');
        return jwtConfig.createJwtOptions();
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UserJwtStrategy],
  exports: [JwtModule, UserJwtStrategy],
})
export class UserAuthModule {}
