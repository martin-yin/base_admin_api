import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CommonModule } from '../common/common.module';
import { ValidationProvider } from '../common/core/validation/validation.provider';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from '@/shared/module/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ClientModule } from './client/client.module';

@Module({
  imports: [
    CommonModule.forRoot(),
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 1000,
      },
    ]),
    AdminModule,
    // ClientModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'upload'),
      serveRoot: '/upload',
    }),
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
