import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WowVersion } from './entity/index.entity';
import { CreateVersionDto, UpdateVersionDto } from './dto/version.dto';
import { ApiException } from '@/core/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class GameVersionService {
  constructor(
    @InjectRepository(WowVersion)
    private versionRepository: Repository<WowVersion>,
  ) {}

  async create(createVersionDto: CreateVersionDto): Promise<WowVersion> {
    const version = this.versionRepository.create(createVersionDto);
    return await this.versionRepository.save(version);
  }

  async findAll(): Promise<WowVersion[]> {
    return await this.versionRepository.find();
  }

  async findOne(id: number): Promise<WowVersion> {
    const version = await this.versionRepository.findOne({ where: { id } });
    if (!version) {
      throw new ApiException('版本不存在', HttpStatus.NOT_FOUND);
    }
    return version;
  }

  async update(
    id: number,
    updateVersionDto: UpdateVersionDto,
  ): Promise<WowVersion> {
    const version = await this.findOne(id);
    Object.assign(version, updateVersionDto);
    return await this.versionRepository.save(version);
  }

  async remove(id: number): Promise<void> {
    const version = await this.findOne(id);
    await this.versionRepository.remove(version);
  }
}
