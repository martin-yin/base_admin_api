import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ValidationProvider } from '@/core/validation';
import { CoreModule } from '@/core';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [
    CoreModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 1000,
      },
    ]),
    FrontendModule,
    AdminModule,
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
