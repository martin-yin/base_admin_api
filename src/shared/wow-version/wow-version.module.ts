import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WowVersionController } from './wow-version.controller';
import { WowVersion } from './entity/index.entity';
import { WowVersionService } from './wow-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([WowVersion])],
  controllers: [WowVersionController],
  providers: [WowVersionService],
  exports: [WowVersionService],
})
export class WowVersionModule {}
