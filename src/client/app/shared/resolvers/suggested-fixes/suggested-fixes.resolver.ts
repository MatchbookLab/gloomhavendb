import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SuggestedFix } from '../../../../../shared/entities/suggested-fix';
import { ApiService } from '../../../services/api/api.service';

export const EntityType = new InjectionToken<string>('EntityType');

export const EntityIdOrNumberKey = new InjectionToken<string>('EntityIdOrNumber');

@Injectable()
export class SuggestedFixesResolver<T> implements Resolve<SuggestedFix<T>[]> {
  constructor(
    private api: ApiService,
    @Inject(EntityType)
    private entityType: string,
    @Inject(EntityIdOrNumberKey)
    private entityIdOrNumberKey: string,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SuggestedFix<T>[]> {
    console.log(this.entityType);
    console.log(this.entityIdOrNumberKey);
    const entityIdOrNumber = route.paramMap.get(this.entityIdOrNumberKey);
    return this.api.matchingSuggestedFixes<T>(this.entityType, entityIdOrNumber);
  }
}
