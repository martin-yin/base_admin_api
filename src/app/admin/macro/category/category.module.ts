import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacroCategoryEntity } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([MacroCategoryEntity])],
  controllers: [],
  providers: [],
})
export class CategoryModule {}
