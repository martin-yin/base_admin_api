import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from './entity/toy.entity';
import { ToyService } from './toy.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToyEntity])],
  controllers: [],
  providers: [ToyService],
  exports: [],
})
export class ToyModule {}
