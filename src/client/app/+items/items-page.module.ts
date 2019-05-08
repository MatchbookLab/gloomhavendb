import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_TITLE_PLACEHOLDER } from '../services/title/title.service';
import { BetterRoute } from '../util/routing';

import { ItemsPageComponent } from './items-page.component';

export enum ItemRoutes {
  Items = '',
  Item = ':number',
}

const routes: BetterRoute<ItemRoutes>[] = [
  {
    path: ItemRoutes.Items,
    component: ItemsPageComponent,
    data: {},
  },
  {
    path: ItemRoutes.Item,
    loadChildren: './+item/item-page.module#ItemPageModule',
    data: {
      title: ROUTE_TITLE_PLACEHOLDER,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsPageRouterModule {}

@NgModule({
  imports: [RouterModule, ItemsPageRouterModule],
  declarations: [ItemsPageComponent],
})
export class ItemsPageModule {}
