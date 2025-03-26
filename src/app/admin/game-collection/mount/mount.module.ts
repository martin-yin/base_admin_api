import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountService } from './mount.service';
// import { WoWHeadMountEntity } from './entity/wowhead-mounts.entity';
import { MountEntity } from './entity/mounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MountEntity])],
  controllers: [],
  providers: [MountService],
  exports: [MountService],
})
export class MountModule {}
