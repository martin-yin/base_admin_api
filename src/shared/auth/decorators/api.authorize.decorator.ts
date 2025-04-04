import { AUTHORIZE_METADATA } from '@/shared/constants/api-authorize';
import { SetMetadata } from '@nestjs/common';

export const ApiAuthorize = (
  ...perms: Array<string | Array<string | null>>
) => {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (perms.length < 1) {
      throw new Error(
        `${target.constructor.name}.${String(key)} 定义了空权限编号`,
      );
    }

    SetMetadata(AUTHORIZE_METADATA, perms)(target, key, descriptor);
  };
};
