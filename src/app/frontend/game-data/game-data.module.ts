import { Module } from '@nestjs/common';
import { GameDataModule as AdminGameDataModule } from '@/app/admin/game-data/game-data.module';
import { GameDataController } from './game-data.controller';

@Module({
  imports: [AdminGameDataModule],
  controllers: [GameDataController],
  providers: [],
})
export class GameDataModule {}
