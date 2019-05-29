import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../../shared/types/entities/item';
import { ApiService } from '../services/api/api.service';
import { ROUTE_TITLE_PLACEHOLDER } from '../services/meta-tags/meta-tags.service';
import { ResolveService, RouteResolvers } from '../services/resolver/resolve.service';
import { WipBannerModule } from '../shared/wip-banner/wip-banner.module';
import { BetterRoute } from '../util/routing';

import { ItemsPageComponent, ItemsResolveData } from './items-page.component';

export enum ItemRoutes {
  Items = '',
  Item = ':number',
}

const resolveRouteData: RouteResolvers<ItemsResolveData> = {
  items: 'ItemsResolver',
};

const routes: BetterRoute<ItemRoutes>[] = [
  {
    path: ItemRoutes.Items,
    component: ItemsPageComponent,
    data: {
      title: 'Items',
    },
    resolve: resolveRouteData,
  },
  {
    path: ItemRoutes.Item,
    loadChildren: () => import('./+item/item-page.module').then(m => m.ItemPageModule),
    runGuardsAndResolvers: 'always',
    data: {
      title: ROUTE_TITLE_PLACEHOLDER,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: resolveRouteData.items,
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (): string => 'items',
          getFreshData: (api: ApiService): Promise<Item[]> => api.getItems(),
        }),
      deps: [ResolveService],
    },
  ],
})
export class ItemsPageRouterModule {}

@NgModule({
  imports: [CommonModule, ItemsPageRouterModule, FontAwesomeModule, WipBannerModule],
  declarations: [ItemsPageComponent],
})
export class ItemsPageModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faArrowCircleLeft);
  }
}
