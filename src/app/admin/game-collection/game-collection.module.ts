import { Module } from '@nestjs/common';
import { MountModule } from './mount/mount.module';

@Module({
  imports: [MountModule],
  controllers: [],
  providers: [],
  exports: [MountModule],
})
export class GameCollectionModule {}
