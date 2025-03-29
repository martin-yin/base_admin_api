import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToyEntity } from '../achievement/entity/toy.entity';
import { ToyService } from './toy.service';
import { ToyController } from './toy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ToyEntity])],
  controllers: [ToyController],
  providers: [ToyService],
  exports: [ToyService],
})
export class ToyModule {}
