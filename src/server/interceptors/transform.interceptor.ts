import { Injectable } from '@angular/core';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Request } from 'express';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    // make our query params (which are typically strings) be booleans!
    // TODO does this need to be recursive?
    if (request.query) {
      _.forEach(request.query, (val: any, key: string) => {
        if (val === '1' || val === 'true') {
          request.query[key] = true;
        } else if (val === '0' || val === 'false') {
          request.query[key] = false;
        }
      });
    }

    return next.handle().pipe(map(data => classToPlain(data)));
  }
}
