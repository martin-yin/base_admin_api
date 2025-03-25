import { AdminJwtStrategy } from '@/shared/auth/strategies/admin-jwt.strategy';
import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { UploadModule } from './upload/upload.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AdminJwtModule } from '@/shared/auth/admin.jwt.module';

@Module({
  imports: [
    AdminJwtModule,
    SystemModule,
    UploadModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    AdminJwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
  ],
})
export class AdminModule {}
