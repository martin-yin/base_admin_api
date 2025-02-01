import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ValidationProvider } from './common/validation/validation.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRoleEntity } from './admin/user/entity/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32768,
      username: 'root',
      password: '123456',
      timezone: '+08:00',
      dateStrings: true, // 日期以字符串形式返回
      charset: 'utf8mb4',
      database: 'base_admin',
      entities: [UserEntity, UserRoleEntity],
      synchronize: true,
    }),
    CommonModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ValidationProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
