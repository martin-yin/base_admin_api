import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  versionNumber: string;

  @IsString()
  icon: string;
}

export class UpdateVersionDto extends CreateVersionDto {}