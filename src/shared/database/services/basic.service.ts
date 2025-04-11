import { BadRequestException, HttpStatus } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { success } from '@/core/utils/handle';
import { Result } from '@/core/types';
import { ApiException } from '@/core/exceptions';

export interface FindWhere {
  readonly [key: string]: string | number | boolean;
}

export abstract class DataBasicService<T> {
  constructor(protected repository: Repository<T>) { }

  async findOne(id: string | number | FindOneOptions<T>): Promise<T> {
    const record = await this.repository.findOne({ where: { id: id } } as any);
    if (!record) {
      throw new BadRequestException(`没有查询到对应数据!`);
    }
    return record;
  }

  async basicCreate(entity: DeepPartial<T>): Promise<Result> {
    let ojb: T;
    try {
      ojb = await this.repository.save<T>(this.repository.create(entity));
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('数据已经存在', HttpStatus.CONFLICT);
      throw new ApiException('新增数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return success('新增成功', ojb);
  }

  async basicEdit(id: number, entity: DeepPartial<T>) {
    let obj: T;

    const existing = await this.findOne(id as any);
    if (!existing)
      throw new ApiException(`修改失败，ID 为 '${id}' 数据不存在`, 404);

    try {
      obj = await this.repository.save<T>(
        this.repository.merge(existing, {
          ...entity,
        }),
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ApiException('数据已经存在', HttpStatus.CONFLICT);
      throw new ApiException('修改数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return success('修改数据成功', obj);
  }

  /**
   * 删除数据
   * @param criteria
   * @param softDelete
   * @returns
   */
  async basicDelete(
    criteria: string | number,
    softDelete = true,
  ): Promise<DeleteResult | UpdateResult | T> {
    const entity: any = await this.findOne(criteria);
    if (!entity) {
      throw new ApiException(
        `没有查询到对应数据，无法删除!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      if (softDelete) {
        entity.isDelete = 1;
        return await this.basicUpdate(criteria, entity);
      } else {
        return await this.repository.delete(criteria);
      }
    } catch (e) {
      throw new ApiException(`删除数据失败`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async basicUpdate(
    id: string | number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult | T> {
    try {
      return await this.repository.update(id, partialEntity);
    } catch (e) {
      throw new ApiException('修改数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
