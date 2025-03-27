import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './entity/pet.entity';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
