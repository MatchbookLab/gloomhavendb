import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as _ from 'lodash';
import { RoleId } from '../../shared/constants/role-id';
import { UserLite } from '../../shared/types/user-lite';
import { roleIdsMetaDataKey } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roleIdsOnClass = this.reflector.get<RoleId[]>(roleIdsMetaDataKey, context.getClass());
    const roleIdsOnMethod = this.reflector.get<RoleId[]>(roleIdsMetaDataKey, context.getHandler());

    const roleIds = roleIdsOnMethod || roleIdsOnClass;

    const user: UserLite = <UserLite>context.switchToHttp().getRequest<Request>().user;

    return _.includes(roleIds, user.roleId);
  }
}
