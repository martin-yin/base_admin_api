import { Injectable } from '@nestjs/common';
import { MountService } from '../game-collection/mount/mount.service';
import { PetService } from '../game-collection/pet/pet.service';
import { ToyService } from '../game-collection/toy/toy.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly mountService: MountService,
    private readonly petService: PetService,
    private readonly toyService: ToyService,
  ) {}

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

  async createPets(pets: any[]) {
    const data = pets.map((item) => {
      return {
        petId: item['id'],
        name: item['中文名称'],
        iconUrl: item['图标地址'],
        version: item['版本'],
        faction: item['阵营'],
        source: item['来源'],
        postUid: item['帖子UID'] || '',
        postLink: item['帖子链接'] || '',
      };
    });
    return this.petService.createPetsData(data as any);
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
    return this.toyService.createToysData(data as any);
  }
}
