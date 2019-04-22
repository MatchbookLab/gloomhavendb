import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IdMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // if there is an ID in the body and in the param, they must match to continue
    if (
      'id' in (request.body || {}) &&
      'id' in (request.params || {}) &&
      +request.body.number !== +request.params.number
    ) {
      throw new HttpException(
        'Cannot complete this request with a resource with an ID that does not match the ID in the URL',
        422,
      );
    }

    return true;
  }
}
