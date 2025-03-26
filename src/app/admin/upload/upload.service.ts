import { Injectable } from '@nestjs/common';
import { MountService } from '../game-collection/mount/mount.service';

@Injectable()
export class UploadService {
  constructor(private readonly mountService: MountService) {}

  async createMountData(mounts: any[]) {
    console.log(mounts);
  }
}
