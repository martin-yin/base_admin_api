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
    if (
      !wordpressUserData ||
      wordpressUserData.error ||
      !wordpressUserData.is_logged_in
    ) {
      return {
        success: false,
        message: '用户未登录或数据无效',
      };
    }
    const wpUser = wordpressUserData.user_data;
    this.updateOrCreateLocalUser(wpUser);
    // 生成JWT令牌
    const token = this.jwtService.sign({
      id: wpUser.ID,
      username: wpUser.user_login,
      displayName: wpUser.display_name,
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

  // 更新或创建本地用户
  async updateOrCreateLocalUser(wpUser: any) {
    try {
      let user = await this.userRepository.findOne({
        where: { id: Number(wpUser.ID) },
      });
      
      if (!user) {
        user = new UserEntity();
        user.id = Number(wpUser.ID);
      }

      user.userLogin = wpUser.user_login;
      user.userNicename = wpUser.user_nicename;
      user.userEmail = wpUser.user_email;
      user.displayName = wpUser.display_name;
      user.avatar = wpUser?.avatar || '';
      
      // 保存用户并返回保存后的实体
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('更新或创建本地用户失败:', error);
      throw error;
    }
  }
}
