import { Module } from '@nestjs/common';
import { GameDataModule } from './game-data/game-data.module';

@Module({
  imports: [GameDataModule],
  controllers: [],
  providers: [],
})
export class FrontendModule {}
