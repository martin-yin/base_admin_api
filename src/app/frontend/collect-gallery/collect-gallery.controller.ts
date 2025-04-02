import { CollectGalleryService } from '@/app/admin/collect-gallery/collect-gallery.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('collect-gallery')
export class CollectGalleryController {
  constructor(private readonly collectGalleryService: CollectGalleryService) {}

  @Get('collection')
  async getCollectionList(@Query('type') type = 'pet') {
    return await this.collectGalleryService.getCollectionProcess(type);
  }

  @Get('')
  async getPetList(
    @Query('type') type: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.collectGalleryService.getCollectGallery(
      type,
      page,
      limit,
    );
  }

  @Get('info')
  async getGameDataInfo(@Query('type') type: string) {
    return await this.collectGalleryService.getCollectGalleryInfo(type);
  }

  @Get('collection/process')
  async getCollectionProcess(@Query('type') type: string) {
    return await this.collectGalleryService.getCollectionProcess(type, 1);
  }
}
