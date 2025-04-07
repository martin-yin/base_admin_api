import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GameVersionService } from './game-version.service';
import { CreateVersionDto, UpdateVersionDto } from './dto/version.dto';
import { WowVersion } from './entity/index.entity';

@Controller('game-versions')
export class GameVersionController {
  constructor(private readonly versionService: GameVersionService) {}

  @Post()
  create(@Body() createVersionDto: CreateVersionDto): Promise<WowVersion> {
    return this.versionService.create(createVersionDto);
  }

  @Get()
  findAll(): Promise<WowVersion[]> {
    return this.versionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<WowVersion> {
    return this.versionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVersionDto: UpdateVersionDto,
  ): Promise<WowVersion> {
    return this.versionService.update(+id, updateVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.versionService.remove(+id);
  }
}