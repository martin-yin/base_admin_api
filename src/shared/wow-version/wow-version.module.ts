import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WowVersion } from './entity/index.entity';
import { WowVersionService } from './wow-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([WowVersion])],
  controllers: [],
  providers: [WowVersionService],
  exports: [WowVersionService],
})
export class WowVersionModule {}
