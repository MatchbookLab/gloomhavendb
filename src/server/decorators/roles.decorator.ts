import { SetMetadata } from '@nestjs/common';
import { RoleId } from '../../shared/constants/role-id';

export const roleIdsMetaDataKey = 'roleIds';

export const Roles = (...roleIds: RoleId[]) => SetMetadata(roleIdsMetaDataKey, roleIds);
