import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { FaIconService, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { SuggestedFixType } from '../../../../shared/constants/suggested-fix-type';
import { Item } from '../../../../shared/entities/item';
import { ApiService } from '../../services/api/api.service';
import { RouteResolvers, ResolveService } from '../../services/resolver/resolve.service';
import { DiffModule } from '../../shared/diff/diff.module';
import { IconModule } from '../../shared/icon/icon.module';
import { ItemModule } from '../../shared/item/item.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { TextWithIconsModule } from '../../shared/text-with-icons/text-with-icons.module';

import { ItemPageComponent, ItemResolveData } from './item-page.component';

const resolveRouteData: RouteResolvers<ItemResolveData> = {
  item: 'ItemResolver',
  suggestedFixes: 'SuggestedFixesResolver',
};

const routes: Routes = [
  {
    path: '',
    component: ItemPageComponent,
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
export class ItemPageRouterModule {}

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    ItemPageRouterModule,
    ItemModule,
    IconModule,
    PipesModule,
    FormsModule,
    TextWithIconsModule,
    HttpClientModule,
    DiffModule,
    FontAwesomeModule,
  ],
  declarations: [ItemPageComponent],
})
export class ItemPageModule {
  constructor(private faIconService: FaIconService) {
    this.faIconService.defaultPrefix = 'fas';
    library.add(faPencilAlt);
  }
}
