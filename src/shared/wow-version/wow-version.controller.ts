import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WowVersionService } from './wow-version.service';
import { CreateVersionDto, UpdateVersionDto } from './dto/version.dto';
import { WowVersion } from './entity/index.entity';

@Controller('wow-versions')
export class WowVersionController {
  constructor(private readonly versionService: WowVersionService) {}

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
