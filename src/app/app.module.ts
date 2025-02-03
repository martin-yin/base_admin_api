import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from '../common/common.module';
import { ValidationProvider } from '../common/validation/validation.provider';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from '@/shared/module/database.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 1000,
      },
    ]),
    AdminModule,
  ],
  providers: [
    ValidationProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
