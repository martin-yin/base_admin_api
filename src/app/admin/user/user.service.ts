import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { UserEntity, UserFavoriteEntity } from './entitys/index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends DataBasicService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserFavoriteEntity)
    private readonly userFavoriteEntity: Repository<UserFavoriteEntity>,
  ) {
    super(userRepository);
  }
}
