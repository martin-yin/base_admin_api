import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountService } from './mount.service';
// import { WoWHeadMountEntity } from './entity/wowhead-mounts.entity';
import { MountEntity } from './entity/mounts.entity';
import { MountController } from './mount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MountEntity])],
  controllers: [MountController],
  providers: [MountService],
  exports: [MountService],
})
export class MountModule {}
