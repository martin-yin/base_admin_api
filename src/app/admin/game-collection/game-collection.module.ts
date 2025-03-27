import { Module } from '@nestjs/common';
import { MountModule } from './mount/mount.module';
import { PetModule } from './pet/pet.module';
import { ToyModule } from './toy/toy.module';

@Module({
  imports: [MountModule, PetModule, ToyModule],
  controllers: [],
  providers: [],
  exports: [MountModule, PetModule, ToyModule],
})
export class GameCollectionModule {}
