import { UserEntity } from '@/app/admin/user/entitys/user.entity';
import { WordpressUserEntity } from '@/core/database/entitys/wordpress.user.entity';
import { DataBasicService } from '@/core/database/services/basic.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService extends DataBasicService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(WordpressUserEntity, 'wordpress_db')
    private wordpressUser: Repository<WordpressUserEntity>,

    private jwtService: JwtService,
  ) {
    super(userRepository);
  }

  async findAll() {
    return await this.wordpressUser.find();
  }

  processWordpressUserData(wordpressUserData: any) {
    // 如果用户未登录或数据无效
    if (
      !wordpressUserData ||
      !wordpressUserData.data ||
      wordpressUserData.success === false
    ) {
      return {
        success: false,
        message: '用户未登录或数据无效',
      };
    }

    const wpUser = wordpressUserData.data;

    // 查找或创建本地用户
    this.findOrCreateLocalUser(wpUser);

    // 生成JWT令牌
    const token = this.jwtService.sign({
      id: wpUser.ID,
      username: wpUser.user_login,
      email: wpUser.user_email,
    });

    // 返回处理后的数据
    return {
      success: true,
      user: {
        id: wpUser.ID,
        username: wpUser.user_login,
        displayName: wpUser.display_name,
        email: wpUser.user_email,
      },
      token,
    };
  }

  // 查找或创建本地用户
  async findOrCreateLocalUser(wpUser: any) {
    try {
      return await this.userRepository.findOne({
        where: { id: wpUser.ID },
      });
    } catch (error) {
      console.error('查找或创建本地用户失败:', error);
      throw error;
    }
  }
}
