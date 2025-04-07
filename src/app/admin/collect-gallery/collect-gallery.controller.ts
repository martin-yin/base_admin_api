import { Controller, Get, Query } from '@nestjs/common';
import { CollectGalleryService } from './collect-gallery.service';

@Controller('admin/collect-gallery')
export class CollectGalleryController {
  constructor(private readonly collectGalleryService: CollectGalleryService) {}

  @Get('battle-pet')
  async getBattlePetList() {
    return await this.collectGalleryService.getBattlePetList();
  }

  @Get('toy')
  async getToyList() {
    return await this.collectGalleryService.getToyList();
  }

  @Get('mount')
  async getMountList() {
    return await this.collectGalleryService.getMountList();
  }

  @Get('achievement')
  async getAchievementList() {
    return await this.collectGalleryService.getAchievementList();
  }

  @Get('sysnc-data')
  async syncData(@Query('type') type: string) {
    return await this.collectGalleryService.sysncData(type);
  }
}
