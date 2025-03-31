import { Controller, Get } from '@nestjs/common';
import { CollectGalleryService } from './collect-gallery.service';

@Controller('admin/collect-gallery')
export class CollectGalleryController {
  constructor(private readonly collectGalleryService: CollectGalleryService) {}

  @Get('pet')
  async getPetList() {
    return await this.collectGalleryService.getPetList();
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
}
