import { IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  userId: number;

  @IsString()
  name: string;

  @IsString()
  remark?: string;

  @IsNumber()
  isPublic: number;
}
