import { Injectable } from '@nestjs/common';
import { MountService } from '../game-collection/mount/mount.service';

@Injectable()
export class UploadService {
  constructor(private readonly mountService: MountService) {}

  async createMounts(mounts: any[]) {
    const data = mounts.map((item) => {
      return {
        mountId: item['id'],
        name: item['中文名称'],
        category: item['类别'],
        iconUrl: item['图标地址'],
        version: item['版本'],
        faction: item['阵营'],
        source: item['来源'],
        postUid: item['帖子UID'] || '',
        postLink: item['帖子链接'] || '',
      };
    });
    return this.mountService.createMountsData(data as any);
  }
}
