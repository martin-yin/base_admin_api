import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DungeonScoreDto {
  @IsString()
  name: string;

  @IsNumber()
  bestLevel: number;

  @IsNumber()
  bestScore: number;

  @IsString()
  Date: string;
}

export class CharacterDto {
  @IsString()
  name: string;

  @IsString()
  realm: string;

  @IsString()
  class: string;

  @IsString()
  faction: string;

  @IsString()
  race: string;

  @IsNumber()
  level: number;

  @IsNumber()
  xpPercent: number;

  @IsString()
  @IsOptional()
  guild?: string;

  @IsString()
  uniqueID: string;

  @IsString()
  bnetID: string;

  @IsNumber()
  itemLevel: number;

  @IsNumber()
  achievementPoints: number;

  @IsNumber()
  mythicScore: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DungeonScoreDto)
  dungeonScores: DungeonScoreDto[];
}

export class MountDto {
  @IsString()
  name: string;

  @IsNumber()
  spellID: number;
}

export class PetDto {
  @IsString()
  name: string;

  @IsNumber()
  speciesID: number;
}

export class AchievementDto {
  @IsString()
  name: string;

  @IsString()
  achievementId: string;
}

export class ToyDto {
  @IsString()
  name: string;

  @IsString()
  id: string;
}

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => CharacterDto)
  characters: CharacterDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MountDto)
  @IsOptional()
  mounts?: MountDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetDto)
  @IsOptional()
  pets?: PetDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AchievementDto)
  @IsOptional()
  achievements?: AchievementDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ToyDto)
  @IsOptional()
  toys?: ToyDto[];
}
