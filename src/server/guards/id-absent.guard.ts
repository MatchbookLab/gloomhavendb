import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IdAbsentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // can only continue if the body does not have an ID
    if ('id' in (request.body || {})) {
      throw new HttpException('Cannot complete this request with an entity that already has an ID', 422);
    }

    return true;
  }
}
