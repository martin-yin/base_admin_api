import { UserEntity } from '@/app/admin/user/entitys/user.entity';
import { WordpressUserEntity } from '@/core/database/entitys/wordpress.user.entity';
import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends DataBasicService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(WordpressUserEntity, 'wordpress_db') // 指定连接名称[2](@ref)
    private wordpressUser: Repository<WordpressUserEntity>,
  ) {
    super(userRepository);
  }

  async findAll() {
    return await this.wordpressUser.find();
  }
}
