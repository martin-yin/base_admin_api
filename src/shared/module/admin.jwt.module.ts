import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtConfigService } from '../service/admin.jwt.service';
import { AdminJwtStrategy } from '../service/admin.jwt.strategy';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: AdminJwtConfigService,
    }),
  ],
  providers: [AdminJwtStrategy],
  exports: [JwtModule, AdminJwtStrategy],
})
export class AdminJwtModule {}
