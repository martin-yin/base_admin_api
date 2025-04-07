import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameVersionService } from './game-version.service';
import { GameVersionController } from './game-version.controller';
import { WowVersion } from './entity/index.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WowVersion])],
  controllers: [GameVersionController],
  providers: [GameVersionService],
})
export class GameVersionModule {}