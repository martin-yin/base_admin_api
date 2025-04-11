import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";
import { success } from "@/core/utils/handle";
import { ApiException } from "@/core/exceptions/api.exception";
import { HttpStatus } from "@nestjs/common";
import { ToyEntity } from "./entitys/toy.entity";
import { MountEntity } from "./entitys/mounts.entity";
import { BattlePetEntity } from "./entitys/battle.pet.entity";
import { WowVersionService } from "../wow-version/wow-version.service";

@Injectable()
export class CollectGalleryService {
  constructor(
    @InjectRepository(ToyEntity)
    private toyRepository: Repository<ToyEntity>,
    @InjectRepository(BattlePetEntity)
    private battlePetRepository: Repository<BattlePetEntity>,
    @InjectRepository(MountEntity)
    private mountRepository: Repository<MountEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,

    private wowVersionService: WowVersionService
  ) { }

  async getCollectGallery(
    type: string,
    page: number = 1,
    limit: number = 10,
    user_id?: number
  ) {
    switch (type) {
      case "toy":
        return await this.getToyList(page, limit, user_id);
      case "battlePet":
        return await this.getBattlePetList(page, limit, user_id);
      case "mount":
        return await this.getMountList(page, limit, user_id);
      default:
        throw new ApiException("不支持的类型", HttpStatus.BAD_REQUEST);
    }
  }

  async getBattlePetList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.battlePetRepository
        .createQueryBuilder("battle_pets")
        .select([
          "battle_pets.id as id",
          "battle_pets.name as name",
          "battle_pets.icon as icon",
          "battle_pets.screenshot as screenshot",
          "battle_pets.camp as camp",
          "battle_pets.post_uid as post_uid",
          "battle_pets.post_link as post_link",
          // 修改为检查 collection_ids 是否包含 battle_pet_id
          "CASE WHEN user_collections.id IS NOT NULL AND FIND_IN_SET(battle_pets.battle_pet_id, user_collections.collection_ids) > 0 THEN true ELSE false END as is_collected",
          "CASE WHEN user_favorites.id IS NOT NULL AND user_favorites.target_id = battle_pets.id THEN true ELSE false END as is_favorited",
        ])
        .leftJoin(
          "data_site_user_collections",
          "user_collections",
          "user_collections.user_id = :userId AND user_collections.type = :type",
          { userId: user_id, type: "battlePet" }
        )
        .leftJoin(
          "data_site_user_favorites",
          "user_favorites",
          "user_favorites.user_id = :userId AND user_favorites.type = :type AND user_favorites.target_id = battle_pets.id",
          { userId: user_id, type: "battlePet" }
        )
        .leftJoin(
          "data_site_wow_versions",
          "wow_versions",
          "wow_versions.id = battle_pets.versionId"
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();

      const total = await queryBuilder.getCount();

      return {
        list: data.map((item) => {
          return {
            ...item,
            is_favorited: item.is_favorited === "1" ? true : false,
            is_collected: item.is_collected === "1" ? true : false,
          };
        }),
        total,
        page,
        limit,
      };
    }

    const list = await this.battlePetRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.battlePetRepository.count();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getToyList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.toyRepository
        .createQueryBuilder("toys")
        .select([
          "toys.id as id",
          "toys.name as name",
          "toys.icon as icon",
          "toys.screenshot as screenshot",
          "toys.post_uid as post_uid",
          "toys.post_link as post_link",
          // 修改为检查 collection_ids 是否包含 toy_id
          "CASE WHEN user_collections.id IS NOT NULL AND FIND_IN_SET(toys.toy_id, user_collections.collection_ids) > 0 THEN true ELSE false END as is_collected",
          // user_favorites 仍然使用 target_id 比较
          "CASE WHEN user_favorites.id IS NOT NULL AND user_favorites.target_id = toys.id THEN true ELSE false END as is_favorited",
        ])
        .leftJoin(
          "data_site_user_collections",
          "user_collections",
          "user_collections.user_id = :userId AND user_collections.type = :type",
          { userId: user_id, type: "toy" }
        )
        .leftJoin(
          "data_site_user_favorites",
          "user_favorites",
          "user_favorites.user_id = :userId AND user_favorites.type = :type AND user_favorites.target_id = toys.id",
          { userId: user_id, type: "toy" }
        )
        .leftJoin(
          "data_site_wow_versions",
          "wow_versions",
          "wow_versions.id = toys.versionId"
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();
      const total = await queryBuilder.getCount();
      return {
        list: data.map((item) => {
          return {
            ...item,
            is_favorited: item.is_favorited === "1" ? true : false,
            is_collected: item.is_collected === "1" ? true : false,
          };
        }),
        page,
        total,
        limit,
      };
    }

    // 没有用户的情况
    const queryBuilder = this.toyRepository
      .createQueryBuilder("toys")
      .select([
        "toys.id as id",
        "toys.name as name",
        "toys.icon as icon",
        "toys.screenshot as screenshot",
        "toys.post_uid as post_uid",
        "toys.post_link as post_link",
      ])
      .leftJoin(
        "data_site_wow_versions",
        "wow_versions",
        "wow_versions.id = toys.versionId"
      );

    const list = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany();

    const total = await queryBuilder.getCount();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getMountList(page: number = 1, limit: number = 10, user_id?: number) {
    if (user_id) {
      const queryBuilder = this.mountRepository
        .createQueryBuilder("mounts")
        .select([
          "mounts.id as id",
          "mounts.name as name",
          "mounts.icon as icon",
          "mounts.screenshot as screenshot",
          "mounts.camp as camp",
          "mounts.post_uid as post_uid",
          "mounts.post_link as post_link",
          // 修改为检查 collection_ids 是否包含 mount_id
          "CASE WHEN user_collections.id IS NOT NULL AND FIND_IN_SET(mounts.mount_id, user_collections.collection_ids) > 0 THEN true ELSE false END as is_collected",
          "CASE WHEN user_favorites.id IS NOT NULL AND user_favorites.target_id = mounts.id THEN true ELSE false END as is_favorited",
        ])
        .leftJoin(
          "data_site_user_collections",
          "user_collections",
          "user_collections.user_id = :userId AND user_collections.type = :type",
          { userId: user_id, type: "mount" }
        )
        .leftJoin(
          "data_site_user_favorites",
          "user_favorites",
          "user_favorites.user_id = :userId AND user_favorites.type = :type AND user_favorites.target_id = mounts.id",
          { userId: user_id, type: "mount" }
        )
        .leftJoin(
          "data_site_wow_versions",
          "wow_versions",
          "wow_versions.id = mounts.versionId"
        );

      const data = await queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany();
      const total = await queryBuilder.getCount();
      return {
        list: data.map((item) => {
          return {
            ...item,
            is_favorited: item.is_favorited === "1" ? true : false,
            is_collected: item.is_collected === "1" ? true : false,
          };
        }),
        total,
        page,
        limit,
      };
    }

    const list = await this.mountRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.mountRepository.count();

    return {
      list,
      total,
      page,
      limit,
    };
  }

  async getCollectGalleryInfo(type: string) {
    // 根据类型获取对应数据的最后更新时间和总数
    let repository: Repository<any>;
    switch (type) {
      case "battlePet":
        repository = this.battlePetRepository;
        break;
      case "toy":
        repository = this.toyRepository;
        break;
      case "mount":
        repository = this.mountRepository;
        break;
      default:
        throw new ApiException("不支持的类型", HttpStatus.BAD_REQUEST);
    }

    const total = await repository.count();
    const lastUpdated = await repository.find({
      order: {
        updatedAt: "DESC",
      },
      take: 1,
    });

    return {
      type,
      total,
      lastUpdated: lastUpdated[0]?.updatedAt || "",
    };
  }

  /**
   * @description 收藏进度
   * @param userId
   * @param type
   */
  /**
   * @description 收藏进度
   * @param userId
   * @param type
   */
  async getCollectionProcess(type: string, userId?: number) {
    let repository: Repository<any>;
    let idField: string;
    switch (type) {
      case "battlePet":
        repository = this.battlePetRepository;
        idField = "battle_pet_id";
        break;
      case "toy":
        repository = this.toyRepository;
        idField = "toy_id";
        break;
      case "mount":
        repository = this.mountRepository;
        idField = "mount_id";
        break;
      default:
        throw new ApiException("不支持的类型", HttpStatus.BAD_REQUEST);
    }

    // 获取版本列表和每个版本的总数
    const versionStats = await repository
      .createQueryBuilder("item")
      .select(["COUNT(item.id) as total_count", "wow_versions.name as version"])
      .leftJoin(
        "data_site_wow_versions",
        "wow_versions",
        "wow_versions.id = item.versionId"
      )
      .groupBy("wow_versions.name")
      .orderBy("wow_versions.sort", "ASC")
      .getRawMany();

    // 获取总数
    const totalCount = await repository.count();
    if (!userId) {
      return {
        total: {
          collected: 0,
          uncollected: totalCount,
          total: totalCount,
          progress: 0,
        },
        versionCollectiond: versionStats.map((stat) => ({
          version: stat.version,
          collected: 0,
          uncollected: Number(stat.total_count),
          total: Number(stat.total_count),
          progress: 0,
        })),
      };
    }

    // 有用户ID的情况，获取收藏统计
    const totalStats = await repository
      .createQueryBuilder("item")
      .select([
        "COUNT(item.id) as total_count",
        `SUM(CASE WHEN FIND_IN_SET(item.${idField}, user_collections.collection_ids) > 0 THEN 1 ELSE 0 END) as collected_count`,
      ])
      .leftJoin(
        "data_site_user_collections",
        "user_collections",
        "user_collections.user_id = :userId AND user_collections.type = :type",
        { userId, type }
      )
      .getRawOne();

    // 按版本分组统计收藏情况
    const versionCollectionStats = await repository
      .createQueryBuilder("item")
      .select([
        "wow_versions.name as version",
        "COUNT(item.id) as total_count",
        `SUM(CASE WHEN FIND_IN_SET(item.${idField}, user_collections.collection_ids) > 0 THEN 1 ELSE 0 END) as collected_count`,
      ])
      .leftJoin(
        "data_site_wow_versions",
        "wow_versions",
        "wow_versions.id = item.versionId"
      )
      .leftJoin(
        "data_site_user_collections",
        "user_collections",
        "user_collections.user_id = :userId AND user_collections.type = :type",
        { userId, type }
      )
      .groupBy("wow_versions.name")
      .orderBy("wow_versions.sort", "ASC")
      .getRawMany();

    return {
      total: {
        collected: Number(totalStats.collected_count),
        uncollected: Number(totalStats.total_count) - Number(totalStats.collected_count),
        total: Number(totalStats.total_count),
        progress: totalStats.total_count > 0
          ? Number((Number(totalStats.collected_count) / Number(totalStats.total_count)) * 100).toFixed(0)
          : 0,
      },
      versionCollectiond: versionCollectionStats.map((stat) => ({
        version: stat.version,
        collected: Number(stat.collected_count),
        uncollected: Number(stat.total_count) - Number(stat.collected_count),
        total: Number(stat.total_count),
        progress: stat.total_count > 0
          ? Number((Number(stat.collected_count) / Number(stat.total_count)) * 100).toFixed(0)
          : 0,
      })),
    };
  }

  async sysncData(type: string) {
    return await this.entityManager.transaction(async (transactionManager) => {
      const versionMap = await this.wowVersionService.getVersionMap();

      const syncConfig = {
        toy: {
          table: "wowhead_toys",
          entity: ToyEntity,
          idField: "toyId",
          versionField: "version",
          fieldMappings: {
            name: "name",
            icon: "icon_local",
            screenshot: "screenshot_local",
            camp: "camp",
            postUid: "postUid",
            postLink: "postLink",
          },
        },
        battlePet: {
          table: "wowhead_battle_pets",
          entity: BattlePetEntity,
          idField: "battlePetId",
          versionField: "version",
          fieldMappings: {
            name: "name",
            icon: "icon_local",
            screenshot: "screenshot_local",
            camp: "camp",
            postUid: "postUid",
            postLink: "postLink",
          },
        },
        mount: {
          table: "wowhead_mounts",
          entity: MountEntity,
          idField: "mountId",
          versionField: "reagents_version",
          fieldMappings: {
            name: "name",
            type: "nav3", // 字段映射
            icon: "icon_local",
            screenshot: "screenshot_local",
            camp: "reagents_camp", // 字段映射
            postUid: "postUid",
            postLink: "postLink",
          },
        },
      };

      const config = syncConfig[type];
      if (!config) {
        throw new ApiException("不支持的类型", HttpStatus.BAD_REQUEST);
      }

      // 构建查询语句
      let query = `SELECT * FROM ${config.table} WHERE exist = 1`;
      // if (config.condition) {
      //   query += ` AND ${config.condition}`;
      // }
      // 查询数据
      const items = await transactionManager.query(query);
      // 同步数据
      for (const item of items) {
        const version = versionMap.get(item[config.versionField].split(".")[0]);

        // 构建数据对象，处理字段映射
        const data = {
          [config.idField]: item.id,
          versionId: version || 0,
          ...Object.entries(config.fieldMappings).reduce(
            (acc, [targetField, sourceField]) => {
              acc[targetField] = item[sourceField as any];
              return acc;
            },
            {}
          ),
        };

        const existingItem = await transactionManager.findOne(config.entity, {
          where: { [config.idField]: item.id },
        });

        if (existingItem) {
          await transactionManager.update(
            config.entity,
            { [config.idField]: item.id },
            data
          );
        } else {
          const newItem = new config.entity();
          Object.assign(newItem, data);
          await transactionManager.save(config.entity, newItem);
        }
      }

      return success(`数据同步成功`);
    });
  }
}
