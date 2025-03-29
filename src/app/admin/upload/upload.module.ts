// upload.module.ts
import { Module } from '@nestjs/common';
import { GameDataModule } from '../game-data/game-data.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [GameDataModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
