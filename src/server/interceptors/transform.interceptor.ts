import { Injectable } from '@angular/core';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Request } from 'express';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO may not need this due to updates in Nest
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    // make our query params (which are typically strings) be booleans!
    // TODO does this need to be recursive?
    if (request.query) {
      _.forEach(request.query, (val: any, key: string) => {
        if (val === 'true') {
          request.query[key] = <any>true;
        } else if (val === 'false') {
          request.query[key] = <any>false;
        }
      });
    }

    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
