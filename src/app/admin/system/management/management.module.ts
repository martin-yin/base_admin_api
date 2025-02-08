import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ManagementEntity,
  ManagementRoleEntity,
} from './entity/management.entity';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManagementEntity, ManagementRoleEntity])],
  controllers: [ManagementController],
  providers: [ManagementService],
  exports: [ManagementService],
})
export class ManagementModule {}
