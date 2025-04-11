import { WordpressUserEntity } from '@/shared/database/entitys/wordpress.user.entity';
import { DataBasicService } from '@/shared/database/services/basic.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserFavoriteEntity } from './entitys/user.entity';
import { FavoriteDto } from '@/app/frontend/user/dto/index.dto';
import { ApiException } from '@/core/exceptions';
import { UserCharacterEntity } from './entitys/character.entity';

@Injectable()
export class UserService extends DataBasicService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserFavoriteEntity)
    private readonly userFavoriteEntity: Repository<UserFavoriteEntity>,

    @InjectRepository(WordpressUserEntity, 'wordpress_db')
    private wordpressUser: Repository<WordpressUserEntity>,

    @InjectRepository(UserCharacterEntity)
    private userCharacterEntity: Repository<UserCharacterEntity>,

    private jwtService: JwtService,
  ) {
    super(userRepository);
  }

  /**
   * 获取用户信息、宠物坐骑玩具收集信息，成就完成信息和游戏角色信息
   * @param userId
   * @returns
   */
  async getUserInfo(userId: number) {
    if (!userId) {
      throw new ApiException('用户ID不能为空', HttpStatus.BAD_REQUEST);
    }
    // 获取用户基本信息
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new ApiException('用户不存在', HttpStatus.NOT_FOUND);
    }
    // 获取用户角色信息
    const characters = await this.userCharacterEntity.find({
      where: { userId: userId },
      order: { updatedAt: 'DESC' },
    });
    return {
      user,
      characters,
    };
  }

  /**
   * 根据用户ID获取用户角色
   * @param userId
   * @param characterData
   * @returns
   */
  async updateUserCharacter(userId: number, characterData: any) {
    const userCharacter = await this.userCharacterEntity.findOne({
      where: { userId: userId, uniqueID: characterData.uniqueID },
    });
    if (userCharacter) {
      // 更新已存在的用户角色
      Object.assign(userCharacter, characterData);
      return await this.userCharacterEntity.save(userCharacter);
    }
    // 创建新的用户角色
    const newCharacter = this.userCharacterEntity.create(characterData);
    return await this.userCharacterEntity.save(newCharacter);
  }

  async favorite(userId: number, body: FavoriteDto) {
    if (!userId) {
      return new ApiException('请先登录', HttpStatus.UNAUTHORIZED);
    }

    const existingFavorite = await this.userFavoriteEntity.findOne({
      where: {
        userId: userId,
        type: body.type,
        targetId: body.id,
      },
    });

    if (existingFavorite) {
      await this.userFavoriteEntity.remove(existingFavorite);
      return { success: true, message: '已取消收藏', is_favorited: false };
    } else {
      const newFavorite = this.userFavoriteEntity.create({
        userId: userId,
        type: body.type,
        targetId: body.id,
      });
      await this.userFavoriteEntity.save(newFavorite);
      return { success: true, message: '收藏成功', is_favorited: true };
    }
  }

  processWordpressUserData(wordpressUserData: any) {
    console.log(wordpressUserData, 'wordpressUserData');
    if (Array.isArray(wordpressUserData.user_data)) {
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
      user.userNicename = wpUser.user_nicename;
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
