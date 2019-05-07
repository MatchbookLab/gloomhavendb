import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { ApiService } from '../../services/api/api.service';
import { RouteResolvers, ResolveService } from '../../services/resolver/resolve.service';
import { DiffModule } from '../../shared/diff/diff.module';
import { IconModule } from '../../shared/icon/icon.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';

import { ItemComponent, ItemResolveData } from './item.component';

const resolveRouteData: RouteResolvers<ItemResolveData> = {
  item: 'ItemResolver',
  suggestedFixes: 'SuggestedFixesResolver',
};

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    resolve: resolveRouteData,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    HttpClientModule,
    {
      provide: resolveRouteData.suggestedFixes,
      useFactory: (resolveService: ResolveService) =>
        resolveService.suggestedFixesResolver<Item>(SuggestedFixType.Item, 'number'),
      deps: [ResolveService],
    },
    {
      provide: resolveRouteData.item,
      useFactory: (resolveService: ResolveService) =>
        resolveService.factoryResolver({
          getStateId: (route?: ActivatedRouteSnapshot): string => 'item-' + route.params['number'],
          getFreshData: (api: ApiService, route?: ActivatedRouteSnapshot): Promise<Item> =>
            api.findItem(route.params['number']),
        }),
      deps: [ResolveService],
    },
  ],
})
export class ItemRouterModule {}

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    ItemRouterModule,
    IconModule,
    PipesModule,
    FormsModule,
    TextWithIconsModule,
    HttpClientModule,
    DiffModule,
  ],
  declarations: [ItemComponent],
})
export class ItemModule {}
