import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtConfigService } from '../services/admin.jwt.service';
import { AdminJwtStrategy } from '../services/admin.jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: AdminJwtConfigService,
    }),
  ],
  providers: [AdminJwtStrategy],
  exports: [JwtModule, AdminJwtStrategy],
})
export class AdminJwtModule {}
