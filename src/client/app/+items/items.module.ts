import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTE_TITLE_PLACEHOLDER } from '../services/title/title.service';
import { BetterRoute } from '../util/routing';

import { ItemsComponent } from './items.component';

export enum ItemRoutes {
  Items = '',
  Item = ':number',
}

const routes: BetterRoute<ItemRoutes>[] = [
  {
    path: ItemRoutes.Items,
    component: ItemsComponent,
    data: {},
  },
  {
    path: ItemRoutes.Item,
    loadChildren: './+item/item.module#ItemModule',
    data: {
      title: ROUTE_TITLE_PLACEHOLDER,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRouterModule {}

@NgModule({
  imports: [RouterModule, ItemsRouterModule],
  declarations: [ItemsComponent],
})
export class ItemsModule {}
