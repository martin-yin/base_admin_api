import { Injectable } from '@nestjs/common';
import { CollectGalleryService } from '../collect-gallery/collect-gallery.service';

@Injectable()
export class UploadService {
  constructor(private readonly collectGalleryService: CollectGalleryService) {}

  async createMounts(mounts: any[]) {
    const data = mounts.map((item) => {
      return {
        mountId: item['id'],
        name: item['中文名称'],
        postUid: item['帖子UID'] || '',
        postLink: item['帖子链接'] || '',
      };
    });
    return this.collectGalleryService.createMounts(data as any);
  }

  async createPets(pets: any[]) {
    const data = pets.map((item) => {
      return {
        petId: item['id'],
        name: item['中文名称'],
        postUid: item['帖子UID'] || '',
        postLink: item['帖子链接'] || '',
      };
    });
    return this.collectGalleryService.createPets(data as any);
  }

  async createToys(toys: any[]) {
    const data = toys.map((item) => {
      return {
        toyId: item['id'],
        name: item['中文名'],
        iconUrl: item['图标地址'],
        version: item['版本'],
        faction: item['阵营'],
        source: item['来源'],
        postUid: item['帖子UID'] || '',
      };
    });
    return this.collectGalleryService.createToys(data as any);
  }

  async createAchievements(achievements: any[]) {
    const data = achievements.map((item) => {
      return {
        achievementId: item['id'],
        name: item['中文名称'],
        iconUrl: item['图标地址'],
        detail: item['详情'] || '',
        unlockCondition: item['达成条件'] || '',
        rewards: item['奖励'] ? item['奖励'] : '',
        points: parseInt(item['成就点数']) || 0,
        isAccountShared:
          item['账号共享'] === '是' || item['账号共享'] === 'true',
        faction: item['阵营'] || '双方',
        version: item['版本'] || '',
        itemDetails: item['物品详情'] ? item['物品详情'] : '',
        postUid: item['帖子UID'] || '',
        postUrl: item['帖子链接'] || '',
        categoryId: parseInt(item['分类ID']) || 0,
      };
    });

    return this.collectGalleryService.createAchievements(data as any);
  }
}
