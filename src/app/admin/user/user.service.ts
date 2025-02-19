import { DataBasicService } from '@/shared/service/basic.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends DataBasicService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
