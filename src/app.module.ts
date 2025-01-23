import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ValidationProvider } from './common/validation/validation.provider';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    CommonModule,
 
  ],
  controllers: [AppController],
  providers: [AppService, ValidationProvider],
})
export class AppModule {}
