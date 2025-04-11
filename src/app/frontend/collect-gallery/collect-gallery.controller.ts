import { User } from '@/shared/auth/decorators';
import { CollectGalleryService } from '@/shared/collect-gallery/collect-gallery.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('collect-gallery')
export class CollectGalleryController {
  constructor(private readonly collectGalleryService: CollectGalleryService) { }

  @Get('collection')
  async getCollectionList(@Query('type') type = 'pet', @User() user
  ) {
    return await this.collectGalleryService.getCollectionProcess(type, user.id);
  }

  @Get()
  async getList(
    @Query('type') type: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @User() user,
  ) {
    return await this.collectGalleryService.getCollectGallery(
      type,
      page,
      limit,
      user?.id,
    );
  }

  @Get('info')
  async getGameDataInfo(@Query('type') type: string) {
    return await this.collectGalleryService.getCollectGalleryInfo(type);
  }

  @Get('collection/process')
  async getCollectionProcess(@Query('type') type: string, @User() user) {
    return await this.collectGalleryService.getCollectionProcess(type, user?.id);
  }

  @Get('sysnc-data')
  async sysncData(@Query('type') type: string) {
    return await this.collectGalleryService.sysncData(type);
  }
}
