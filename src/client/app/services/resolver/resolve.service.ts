import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Prop } from '../../../../server/util/props';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { SuggestedFix } from '../../../../shared/entities/suggested-fix';
import { ApiService } from '../api/api.service';
import { PlatformService } from '../platform/platform.service';

export interface ResolverConfig<T> {
  getStateId: (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => string;
  getFreshData: (api: ApiService, route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => Promise<T>;
}

export type RouteResolvers<T> = { [key in keyof T]: string };

@Injectable({ providedIn: 'root' })
export class ResolveService {
  constructor(
    private api: ApiService,
    private transferState: TransferState,
    private platformService: PlatformService,
  ) {}

  factoryResolver<T>(config: ResolverConfig<T>): Resolve<T> {
    return {
      resolve: async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<T> => {
        const id = config.getStateId(route, state);
        const key = makeStateKey<T>(id);

        if (this.transferState.hasKey(key)) {
          const item = this.transferState.get<T>(key, null);
          this.transferState.remove(key);
          return item;
        }

        const data: T = await config.getFreshData(this.api, route, state);
        if (this.platformService.isServer) {
          this.transferState.set(key, data);
        }

        return data;
      },
    };
  }

  suggestedFixesResolver<T>(type: SuggestedFixType, paramKey: string): Resolve<SuggestedFix<T>[]> {
    return this.factoryResolver<SuggestedFix<T>[]>({
      getStateId: (route: ActivatedRouteSnapshot) => `suggested-fixes/${type}/${route.params[paramKey]}`,
      getFreshData: (api: ApiService, route: ActivatedRouteSnapshot) =>
        this.api.getMatchingSuggestedFixes<T>(type, route.params[paramKey]),
    });
  }
}

// this should be injected into each component that uses it so that the get the correct activated route data
@Injectable()
export class ResolvedDataService<T> {
  constructor(private activatedRoute: ActivatedRoute) {}

  get<K extends Prop<T>>(key: K): T[K] {
    return this.activatedRoute.snapshot.data[key];
  }
}
